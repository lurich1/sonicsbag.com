"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useCart } from "./cart-provider"
import { useToast } from "@/hooks/use-toast"
import { Lock } from "lucide-react"

declare global {
  interface Window {
    PaystackPop: {
      setup: (args: {
        key: string
        email: string
        amount: number
        currency: string
        ref: string
        metadata?: Record<string, any>
        callback: (response: { reference: string }) => void
        onClose: () => void
      }) => {
        openIframe: () => void
      }
    }
  }
}

interface CheckoutFormProps {
  total: number
}

export function CheckoutForm({ total }: CheckoutFormProps) {
  const router = useRouter()
  const { clearCart } = useCart()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)

  const [formData, setFormData] = useState({
    // Contact
    email: "",
    // Shipping
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    country: "",
    state: "",
    zipCode: "",
    phone: "",
  })

  // Load Paystack script
  useEffect(() => {
    // Check if script is already loaded
    if (window.PaystackPop) {
      return
    }

    const script = document.createElement("script")
    script.src = "https://js.paystack.co/v1/inline.js"
    script.async = true
    
    script.onerror = () => {
      // Script loading failed - will be handled when user tries to pay
    }

    document.body.appendChild(script)

    return () => {
      // Only remove if it exists
      const existingScript = document.querySelector('script[src="https://js.paystack.co/v1/inline.js"]')
      if (existingScript) {
        document.body.removeChild(existingScript)
      }
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.email) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    try {
      // Initialize Paystack payment
      const response = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          amount: total,
          metadata: {
            custom_fields: [
              {
                display_name: "First Name",
                variable_name: "first_name",
                value: formData.firstName,
              },
              {
                display_name: "Last Name",
                variable_name: "last_name",
                value: formData.lastName,
              },
              {
                display_name: "Phone",
                variable_name: "phone",
                value: formData.phone,
              },
            ],
            shipping_address: {
              address: formData.address,
              apartment: formData.apartment,
              city: formData.city,
              state: formData.state,
              country: formData.country,
              zipCode: formData.zipCode,
            },
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to initialize payment")
      }

      // Open Paystack payment popup
      if (!window.PaystackPop) {
        throw new Error("Paystack script not loaded. Please refresh the page and try again.")
      }

      if (!data.data || !data.data.reference) {
        throw new Error("Invalid payment initialization response")
      }

      // Validate and get the amount - Paystack returns amount in pesewas (smallest currency unit)
      // For GHS, 1 GHS = 100 pesewas
      // Use the amount from API response, or calculate it as fallback
      let paymentAmount = data.data?.amount
      
      // If amount is not in response, calculate it (total in GHS * 100 to get pesewas)
      if (!paymentAmount || paymentAmount <= 0) {
        paymentAmount = Math.round(total * 100)
      }
      
      // Ensure it's a valid number
      paymentAmount = Number(paymentAmount)
      
      if (!paymentAmount || paymentAmount <= 0 || isNaN(paymentAmount)) {
        throw new Error(`Invalid payment amount: ${paymentAmount}. Total: ${total}`)
      }

      const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY

      if (!publicKey) {
        throw new Error(
          "Paystack public key is not configured. Please set NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY in your environment."
        )
      }
      
      // Define async payment handler
      const processPayment = async (reference: string) => {
        try {
          // Verify payment
          const verifyResponse = await fetch(`/api/paystack/verify?reference=${reference}`)
          const verifyData = await verifyResponse.json()

          if (verifyData.status && verifyData.data.status === "success") {
            // Get cart items
            const cartItems = JSON.parse(localStorage.getItem("cart") || "[]")
            
            // Save order to localStorage
            const order = {
              id: verifyData.data.reference,
              date: new Date().toISOString(),
              total,
              status: "processing",
              shipping: formData,
              paymentReference: reference,
              items: cartItems,
            }

            const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]")
            localStorage.setItem("orders", JSON.stringify([order, ...existingOrders]))

            // Also save to server
            try {
              await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(order),
              })
            } catch (error) {
              console.error("Failed to save order to server:", error)
            }

    clearCart()
    toast({
              title: "Payment successful!",
              description: `Order #${order.id} has been placed`,
    })

    router.push("/profile?tab=orders")
          } else {
            toast({
              title: "Payment verification failed",
              description: "Please contact support if payment was deducted",
              variant: "destructive",
            })
          }
        } catch (error) {
          toast({
            title: "Payment verification error",
            description: "An error occurred while verifying payment",
            variant: "destructive",
          })
        } finally {
          setIsProcessing(false)
        }
      }

      // Wrap in synchronous function for Paystack callback
      const handlePaymentCallback = function (response: { reference: string }) {
        // Call async function without awaiting (Paystack expects sync callback)
        processPayment(response.reference).catch(() => {
          // Error already handled in processPayment
        })
      }

      const handlePaymentClose = function () {
        setIsProcessing(false)
        toast({
          title: "Payment cancelled",
          description: "You closed the payment window",
        })
      }
      
      // Ensure all values are properly set before calling Paystack
      const handler = window.PaystackPop.setup({
          key: publicKey,
          email: formData.email,
          amount: paymentAmount, // Amount in pesewas
          currency: "GHS",
          ref: data.data.reference,
          metadata: {
            custom_fields: [
              {
                display_name: "First Name",
                variable_name: "first_name",
                value: formData.firstName,
              },
              {
                display_name: "Last Name",
                variable_name: "last_name",
                value: formData.lastName,
              },
              {
                display_name: "Phone",
                variable_name: "phone",
                value: formData.phone,
              },
            ],
          },
          callback: handlePaymentCallback,
          onClose: handlePaymentClose,
        })

      handler.openIframe()
    } catch (error: any) {
      setIsProcessing(false)
      toast({
        title: "Payment failed",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
      {/* Contact Information */}
      <div>
        <h2 className="font-serif text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Contact Information</h2>
        <div className="space-y-3 sm:space-y-4">
          <div>
            <Label htmlFor="email" className="text-sm">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="mt-1.5"
            />
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div>
        <h2 className="font-serif text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Shipping Address</h2>
        <div className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <Label htmlFor="firstName" className="text-sm">
                First Name
              </Label>
              <Input
                id="firstName"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-sm">
                Last Name
              </Label>
              <Input
                id="lastName"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1.5"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address" className="text-sm">
              Address
            </Label>
            <Input
              id="address"
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              placeholder="Street address"
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="apartment" className="text-sm">
              Apartment, suite, etc. (optional)
            </Label>
            <Input
              id="apartment"
              name="apartment"
              value={formData.apartment}
              onChange={handleChange}
              className="mt-1.5"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <Label htmlFor="city" className="text-sm">
                City
              </Label>
              <Input id="city" name="city" required value={formData.city} onChange={handleChange} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="state" className="text-sm">
                State / Province
              </Label>
              <Input
                id="state"
                name="state"
                required
                value={formData.state}
                onChange={handleChange}
                className="mt-1.5"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <Label htmlFor="country" className="text-sm">
                Country
              </Label>
              <Input
                id="country"
                name="country"
                required
                value={formData.country}
                onChange={handleChange}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="zipCode" className="text-sm">
                ZIP / Postal Code
              </Label>
              <Input
                id="zipCode"
                name="zipCode"
                required
                value={formData.zipCode}
                onChange={handleChange}
                className="mt-1.5"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="phone" className="text-sm">
              Phone
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              className="mt-1.5"
            />
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div>
        <h2 className="font-serif text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Payment Information</h2>
        <div className="space-y-3 sm:space-y-4">
          <div className="p-4 bg-secondary rounded border border-border">
            <p className="text-sm text-muted-foreground">
              You will be redirected to Paystack to complete your payment securely to Soncis Bags. We accept all major cards and mobile money.
            </p>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="border-t border-border pt-4 sm:pt-6">
        <Button type="submit" size="lg" className="w-full h-12 sm:h-14 text-sm sm:text-base" disabled={isProcessing}>
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin">⏳</span>
              Processing...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Lock className="h-4 w-4 sm:h-5 sm:w-5" />
              Complete Order - ₵{total.toLocaleString()}
            </span>
          )}
        </Button>
        <p className="text-xs text-center text-muted-foreground mt-3">
          Your payment information is secure and encrypted
        </p>
      </div>
    </form>
  )
}

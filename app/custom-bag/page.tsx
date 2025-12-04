"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Package, Palette, Ruler, MessageSquare } from "lucide-react"
import { useState } from "react"

export default function CustomBagPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bagType: "",
    dimensions: "",
    color: "",
    material: "",
    specialFeatures: "",
    quantity: "",
    budget: "",
    timeline: "",
    additionalNotes: "",
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send the data to your backend
    console.log("Custom bag request:", formData)
    setSubmitted(true)
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        bagType: "",
        dimensions: "",
        color: "",
        material: "",
        specialFeatures: "",
        quantity: "",
        budget: "",
        timeline: "",
        additionalNotes: "",
      })
    }, 3000)
  }

  return (
    <div className="min-h-screen">
      <Header />

      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Package className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold mb-6 tracking-tight">
              Custom Bag Request
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              Create your perfect bag with our custom design service. Tell us your vision, and we'll bring it to life.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="text-center p-6 rounded-lg bg-secondary">
              <Palette className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Custom Design</h3>
              <p className="text-sm text-muted-foreground">Choose colors, materials, and styles</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-secondary">
              <Ruler className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Perfect Fit</h3>
              <p className="text-sm text-muted-foreground">Specify dimensions for your needs</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-secondary">
              <MessageSquare className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Expert Consultation</h3>
              <p className="text-sm text-muted-foreground">Work with our design team</p>
            </div>
          </div>

          {/* Form */}
          {submitted ? (
            <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-semibold mb-2 text-green-900 dark:text-green-100">
                Request Submitted!
              </h2>
              <p className="text-green-700 dark:text-green-300">
                Thank you for your custom bag request. Our team will review your details and contact you within 2-3 business days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="bg-secondary rounded-lg p-6 space-y-4">
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Bag Specifications */}
              <div className="bg-secondary rounded-lg p-6 space-y-4">
                <h2 className="text-xl font-semibold mb-4">Bag Specifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="bagType" className="block text-sm font-medium mb-2">
                      Bag Type *
                    </label>
                    <select
                      id="bagType"
                      name="bagType"
                      required
                      value={formData.bagType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select type</option>
                      <option value="backpack">Backpack</option>
                      <option value="tote">Tote Bag</option>
                      <option value="duffel">Duffel Bag</option>
                      <option value="messenger">Messenger Bag</option>
                      <option value="briefcase">Briefcase</option>
                      <option value="travel">Travel Bag</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="dimensions" className="block text-sm font-medium mb-2">
                      Dimensions (L x W x H in cm)
                    </label>
                    <input
                      type="text"
                      id="dimensions"
                      name="dimensions"
                      placeholder="e.g., 40 x 30 x 15"
                      value={formData.dimensions}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="color" className="block text-sm font-medium mb-2">
                      Preferred Color(s)
                    </label>
                    <input
                      type="text"
                      id="color"
                      name="color"
                      placeholder="e.g., Navy blue, Black"
                      value={formData.color}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="material" className="block text-sm font-medium mb-2">
                      Preferred Material
                    </label>
                    <select
                      id="material"
                      name="material"
                      value={formData.material}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select material</option>
                      <option value="leather">Leather</option>
                      <option value="canvas">Canvas</option>
                      <option value="nylon">Nylon</option>
                      <option value="polyester">Polyester</option>
                      <option value="cotton">Cotton</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="quantity" className="block text-sm font-medium mb-2">
                      Quantity
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      min="1"
                      value={formData.quantity}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium mb-2">
                      Budget Range (₵)
                    </label>
                    <input
                      type="text"
                      id="budget"
                      name="budget"
                      placeholder="e.g., 500-1000"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="specialFeatures" className="block text-sm font-medium mb-2">
                    Special Features or Requirements
                  </label>
                  <textarea
                    id="specialFeatures"
                    name="specialFeatures"
                    rows={3}
                    placeholder="e.g., Laptop compartment, water-resistant, multiple pockets..."
                    value={formData.specialFeatures}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium mb-2">
                    Desired Timeline
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select timeline</option>
                    <option value="asap">As soon as possible</option>
                    <option value="2weeks">2 weeks</option>
                    <option value="1month">1 month</option>
                    <option value="2months">2 months</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="additionalNotes" className="block text-sm font-medium mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    id="additionalNotes"
                    name="additionalNotes"
                    rows={4}
                    placeholder="Any other details, inspiration images, or specific requirements..."
                    value={formData.additionalNotes}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full sm:w-auto">
                Submit Request
              </Button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}


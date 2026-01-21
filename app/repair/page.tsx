"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Wrench, Shield, Clock, CheckCircle } from "lucide-react"
import { useState } from "react"

export default function RepairPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bagBrand: "",
    bagType: "",
    issueDescription: "",
    damageLocation: "",
    urgency: "",
    photos: "",
    additionalNotes: "",
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch("/api/repair", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit repair request")
      }

      setSubmitted(true)
      // Reset form after 5 seconds
      setTimeout(() => {
        setSubmitted(false)
        setFormData({
          name: "",
          email: "",
          phone: "",
          bagBrand: "",
          bagType: "",
          issueDescription: "",
          damageLocation: "",
          urgency: "",
          photos: "",
          additionalNotes: "",
        })
      }, 5000)
    } catch (error) {
      console.error("Error submitting repair request:", error)
      alert("Failed to submit repair request. Please try again or contact us directly at soncisworld@gmail.com")
    }
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
              <Wrench className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold mb-6 tracking-tight">
              Bag Repair Service
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              Professional bag repair services to restore your favorite bags to their former glory. Expert craftsmanship guaranteed.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="text-center p-6 rounded-lg bg-secondary">
              <Shield className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Expert Repair</h3>
              <p className="text-sm text-muted-foreground">Professional restoration services</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-secondary">
              <Clock className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Quick Turnaround</h3>
              <p className="text-sm text-muted-foreground">Fast and efficient service</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-secondary">
              <CheckCircle className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-sm text-muted-foreground">Satisfaction guaranteed</p>
            </div>
          </div>

          {/* Common Repairs */}
          <div className="bg-secondary rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Common Repairs We Handle</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium mb-1">Zipper Replacement</h3>
                  <p className="text-sm text-muted-foreground">Broken or stuck zippers fixed or replaced</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium mb-1">Strap Repair</h3>
                  <p className="text-sm text-muted-foreground">Handle and shoulder strap restoration</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium mb-1">Lining Replacement</h3>
                  <p className="text-sm text-muted-foreground">Torn or worn interior lining repair</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium mb-1">Seam Repair</h3>
                  <p className="text-sm text-muted-foreground">Stitching and seam reinforcement</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium mb-1">Hardware Replacement</h3>
                  <p className="text-sm text-muted-foreground">Buckles, clasps, and metal parts</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium mb-1">Leather Restoration</h3>
                  <p className="text-sm text-muted-foreground">Cleaning, conditioning, and repair</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          {submitted ? (
            <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-semibold mb-2 text-green-900 dark:text-green-100">
                Repair Request Submitted!
              </h2>
              <p className="text-green-700 dark:text-green-300">
                Thank you for your repair request. Our team will review your details and contact you within 1-2 business days to discuss the repair process and provide a quote.
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
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Bag Information */}
              <div className="bg-secondary rounded-lg p-6 space-y-4">
                <h2 className="text-xl font-semibold mb-4">Bag Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="bagBrand" className="block text-sm font-medium mb-2">
                      Bag Brand
                    </label>
                    <input
                      type="text"
                      id="bagBrand"
                      name="bagBrand"
                      placeholder="e.g., Soncis Bags, Other brand"
                      value={formData.bagBrand}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="bagType" className="block text-sm font-medium mb-2">
                      Bag Type
                    </label>
                    <select
                      id="bagType"
                      name="bagType"
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
                </div>
              </div>

              {/* Repair Details */}
              <div className="bg-secondary rounded-lg p-6 space-y-4">
                <h2 className="text-xl font-semibold mb-4">Repair Details</h2>
                <div>
                  <label htmlFor="issueDescription" className="block text-sm font-medium mb-2">
                    Issue Description *
                  </label>
                  <textarea
                    id="issueDescription"
                    name="issueDescription"
                    required
                    rows={4}
                    placeholder="Please describe the issue with your bag in detail..."
                    value={formData.issueDescription}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="damageLocation" className="block text-sm font-medium mb-2">
                    Location of Damage
                  </label>
                  <select
                    id="damageLocation"
                    name="damageLocation"
                    value={formData.damageLocation}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select location</option>
                    <option value="zipper">Zipper</option>
                    <option value="strap">Strap/Handle</option>
                    <option value="lining">Interior Lining</option>
                    <option value="seam">Seam/Stitching</option>
                    <option value="hardware">Hardware (buckles, clasps)</option>
                    <option value="exterior">Exterior Material</option>
                    <option value="multiple">Multiple Areas</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="urgency" className="block text-sm font-medium mb-2">
                    Urgency
                  </label>
                  <select
                    id="urgency"
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select urgency</option>
                    <option value="urgent">Urgent (needed within a week)</option>
                    <option value="normal">Normal (1-2 weeks)</option>
                    <option value="flexible">Flexible (no rush)</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="photos" className="block text-sm font-medium mb-2">
                    Photo Links (Optional)
                  </label>
                  <input
                    type="text"
                    id="photos"
                    name="photos"
                    placeholder="Paste links to photos of the damage (if available)"
                    value={formData.photos}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    You can upload photos when we contact you, or include image links here
                  </p>
                </div>
                <div>
                  <label htmlFor="additionalNotes" className="block text-sm font-medium mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    id="additionalNotes"
                    name="additionalNotes"
                    rows={3}
                    placeholder="Any other relevant information about the bag or repair needed..."
                    value={formData.additionalNotes}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full sm:w-auto">
                Submit Repair Request
              </Button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}


"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, ShoppingBag } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CustomBagRequest {
  id: number
  name: string
  email: string
  phone: string
  bagType: string
  dimensions: string
  color: string
  material: string
  specialFeatures: string
  quantity: string
  budget: string
  timeline: string
  additionalNotes: string
  status: string
  createdAt: string
}

export default function AdminCustomBagRequestsPage() {
  const [requests, setRequests] = useState<CustomBagRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedRequest, setSelectedRequest] = useState<CustomBagRequest | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("adminToken")
      const response = await fetch("/api/admin/custom-bag-requests", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      setRequests(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error fetching custom bag requests:", error)
      setRequests([])
      toast({
        title: "Error",
        description: "Failed to fetch custom bag requests",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusUpdate = async (requestId: number, newStatus: string) => {
    try {
      const token = localStorage.getItem("adminToken")
      const response = await fetch(`/api/admin/custom-bag-requests/${requestId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Custom bag request status updated successfully",
        })
        fetchRequests()
      } else {
        throw new Error("Failed to update")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update custom bag request status",
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500"
      case "in_progress":
        return "bg-blue-500"
      case "pending":
        return "bg-yellow-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  if (isLoading) {
    return <div className="text-muted-foreground">Loading custom bag requests...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Custom Bag Requests</h1>
        <p className="text-muted-foreground">View and manage custom bag requests</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Custom Bag Requests ({requests.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Bag Type</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-muted-foreground">
                    No custom bag requests found
                  </TableCell>
                </TableRow>
              ) : (
                requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-mono text-sm">#{request.id}</TableCell>
                    <TableCell>
                      {new Date(request.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{request.name}</div>
                        <div className="text-sm text-muted-foreground">{request.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{request.bagType}</TableCell>
                    <TableCell>{request.quantity || "N/A"}</TableCell>
                    <TableCell>{request.budget ? `₵${request.budget}` : "N/A"}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={getStatusColor(request.status)}
                          variant="default"
                        >
                          {request.status}
                        </Badge>
                        <Select
                          value={request.status}
                          onValueChange={(value) => handleStatusUpdate(request.id, value)}
                        >
                          <SelectTrigger className="w-32 h-6 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedRequest(request)
                          setIsDialogOpen(true)
                        }}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Custom Bag Request Details</DialogTitle>
            <DialogDescription>Request #{selectedRequest?.id}</DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Customer Information</h3>
                  <div className="space-y-1 text-sm">
                    <p><strong>Name:</strong> {selectedRequest.name}</p>
                    <p><strong>Email:</strong> <a href={`mailto:${selectedRequest.email}`} className="text-blue-600">{selectedRequest.email}</a></p>
                    <p><strong>Phone:</strong> {selectedRequest.phone || "N/A"}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Bag Specifications</h3>
                  <div className="space-y-1 text-sm">
                    <p><strong>Bag Type:</strong> {selectedRequest.bagType}</p>
                    <p><strong>Dimensions:</strong> {selectedRequest.dimensions || "N/A"}</p>
                    <p><strong>Color:</strong> {selectedRequest.color || "N/A"}</p>
                    <p><strong>Material:</strong> {selectedRequest.material || "N/A"}</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Order Details</h3>
                  <div className="space-y-1 text-sm">
                    <p><strong>Quantity:</strong> {selectedRequest.quantity || "N/A"}</p>
                    <p><strong>Budget:</strong> {selectedRequest.budget ? `₵${selectedRequest.budget}` : "N/A"}</p>
                    <p><strong>Timeline:</strong> {selectedRequest.timeline || "N/A"}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Request Information</h3>
                  <div className="space-y-1 text-sm">
                    <p><strong>Request ID:</strong> #{selectedRequest.id}</p>
                    <p><strong>Date:</strong> {new Date(selectedRequest.createdAt).toLocaleString()}</p>
                    <p><strong>Status:</strong> {selectedRequest.status}</p>
                  </div>
                </div>
              </div>
              {selectedRequest.specialFeatures && (
                <div>
                  <h3 className="font-semibold mb-2">Special Features</h3>
                  <p className="text-sm whitespace-pre-wrap">{selectedRequest.specialFeatures}</p>
                </div>
              )}
              {selectedRequest.additionalNotes && (
                <div>
                  <h3 className="font-semibold mb-2">Additional Notes</h3>
                  <p className="text-sm whitespace-pre-wrap">{selectedRequest.additionalNotes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

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
import { Eye, Wrench } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface RepairRequest {
  id: number
  name: string
  email: string
  phone: string
  bagBrand: string
  bagType: string
  issueDescription: string
  damageLocation: string
  urgency: string
  photos: string
  additionalNotes: string
  status: string
  createdAt: string
}

export default function AdminRepairRequestsPage() {
  const [requests, setRequests] = useState<RepairRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedRequest, setSelectedRequest] = useState<RepairRequest | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("adminToken")
      if (!token) {
        toast({
          title: "Authentication Required",
          description: "Please log in to view repair requests",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      const response = await fetch("/api/admin/repair-requests", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        if (response.status === 401) {
          toast({
            title: "Unauthorized",
            description: "Please log in again",
            variant: "destructive",
          })
          return
        }
        throw new Error(`HTTP ${response.status}`)
      }

      const data = await response.json()
      const requestsArray = Array.isArray(data) ? data : []
      setRequests(requestsArray)
      
      if (requestsArray.length === 0) {
        console.log("No repair requests found. This could mean:")
        console.log("1. No requests have been submitted yet")
        console.log("2. Backend API is not responding")
        console.log("3. Requests are not being saved to the backend")
      }
    } catch (error: any) {
      console.error("Error fetching repair requests:", error)
      setRequests([])
      toast({
        title: "Error",
        description: `Failed to fetch repair requests: ${error?.message || "Unknown error"}`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusUpdate = async (requestId: number, newStatus: string) => {
    try {
      const token = localStorage.getItem("adminToken")
      const response = await fetch(`/api/admin/repair-requests/${requestId}`, {
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
          description: "Repair request status updated successfully",
        })
        fetchRequests()
      } else {
        throw new Error("Failed to update")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update repair request status",
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
    return <div className="text-muted-foreground">Loading repair requests...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Repair Requests</h1>
        <p className="text-muted-foreground">View and manage bag repair requests</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Repair Requests ({requests.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Bag Type</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    No repair requests found
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
                    <TableCell>{request.bagType || "N/A"}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {request.issueDescription}
                    </TableCell>
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
            <DialogTitle>Repair Request Details</DialogTitle>
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
                  <h3 className="font-semibold mb-2">Bag Information</h3>
                  <div className="space-y-1 text-sm">
                    <p><strong>Bag Brand:</strong> {selectedRequest.bagBrand || "N/A"}</p>
                    <p><strong>Bag Type:</strong> {selectedRequest.bagType || "N/A"}</p>
                    <p><strong>Damage Location:</strong> {selectedRequest.damageLocation || "N/A"}</p>
                    <p><strong>Urgency:</strong> {selectedRequest.urgency || "N/A"}</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Issue Description</h3>
                <p className="text-sm whitespace-pre-wrap">{selectedRequest.issueDescription}</p>
              </div>
              {selectedRequest.additionalNotes && (
                <div>
                  <h3 className="font-semibold mb-2">Additional Notes</h3>
                  <p className="text-sm whitespace-pre-wrap">{selectedRequest.additionalNotes}</p>
                </div>
              )}
              {selectedRequest.photos && (
                <div>
                  <h3 className="font-semibold mb-2">Photos</h3>
                  <div className="text-sm text-blue-600">
                    <a href={selectedRequest.photos} target="_blank" rel="noopener noreferrer">
                      View Photos
                    </a>
                  </div>
                </div>
              )}
              <div>
                <h3 className="font-semibold mb-2">Request Information</h3>
                <div className="space-y-1 text-sm">
                  <p><strong>Request ID:</strong> #{selectedRequest.id}</p>
                  <p><strong>Date:</strong> {new Date(selectedRequest.createdAt).toLocaleString()}</p>
                  <p><strong>Status:</strong> {selectedRequest.status}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

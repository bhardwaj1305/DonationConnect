import { useNavigate } from "react-router";
import { Package, Clock, CheckCircle, AlertCircle, Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const mockRequests = [
  {
    id: 1,
    item: "Food Supplies",
    quantity: "20 units",
    status: "approved",
    requestDate: "2026-02-20",
    expectedDelivery: "2026-02-27",
  },
  {
    id: 2,
    item: "Blankets & Warm Clothing",
    quantity: "15 items",
    status: "processing",
    requestDate: "2026-02-22",
    expectedDelivery: "2026-02-28",
  },
  {
    id: 3,
    item: "Hygiene Kits",
    quantity: "10 kits",
    status: "pending",
    requestDate: "2026-02-23",
    expectedDelivery: "TBD",
  },
];

const availableDonations = [
  {
    id: 1,
    item: "Canned Food Packages",
    donor: "Local Food Bank",
    quantity: "50 units",
    location: "Downtown Distribution Center",
  },
  {
    id: 2,
    item: "Winter Clothes",
    donor: "Community Donors",
    quantity: "30 pieces",
    location: "Community Shelter",
  },
  {
    id: 3,
    item: "Medical Supplies",
    donor: "Healthcare Foundation",
    quantity: "25 kits",
    location: "Medical Center",
  },
];

export function RecipientDashboard() {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Recipient Dashboard</h1>
          <p className="text-gray-600 mt-1">Request items and track your deliveries</p>
        </div>
        <Button
          onClick={() => navigate("/recipient/request")}
          className="bg-red-500 hover:bg-red-600 w-full md:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Request Items
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Requests</CardDescription>
            <CardTitle className="text-3xl">12</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Package className="w-4 h-4" />
              <span>All time</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Approved</CardDescription>
            <CardTitle className="text-3xl">8</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span>Ready for delivery</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>In Progress</CardDescription>
            <CardTitle className="text-3xl">3</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-blue-600">
              <Clock className="w-4 h-4" />
              <span>Being processed</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Items Received</CardDescription>
            <CardTitle className="text-3xl">67</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Package className="w-4 h-4" />
              <span>Total items</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Available Donations */}
      <Card>
        <CardHeader>
          <CardTitle>Available Donations</CardTitle>
          <CardDescription>Items currently available for request</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {availableDonations.map((donation) => (
              <div
                key={donation.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-red-300 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{donation.item}</h3>
                    <p className="text-sm text-gray-600 mt-1">From: {donation.donor}</p>
                    <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Package className="w-3 h-3" />
                        {donation.quantity}
                      </span>
                      <span className="flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {donation.location}
                      </span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full sm:w-auto">
                    Request
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* My Requests */}
      <Card>
        <CardHeader>
          <CardTitle>My Requests</CardTitle>
          <CardDescription>Track the status of your item requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockRequests.map((request) => (
              <div
                key={request.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{request.item}</h3>
                  <p className="text-sm text-gray-600">Quantity: {request.quantity}</p>
                  <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-500">
                    <span>Requested: {request.requestDate}</span>
                    <span>•</span>
                    <span>Expected: {request.expectedDelivery}</span>
                  </div>
                </div>
                <Badge className={getStatusColor(request.status)}>
                  {request.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

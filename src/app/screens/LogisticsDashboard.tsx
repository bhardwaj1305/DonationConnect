import { useNavigate } from "react-router";
import { Truck, Package, Clock, CheckCircle, MapPin, AlertCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const deliveries = [
  {
    id: 1,
    item: "Winter Clothes Package",
    from: "Downtown Warehouse",
    to: "Community Shelter - 123 Main St",
    status: "in-transit",
    priority: "high",
    estimatedTime: "30 mins",
  },
  {
    id: 2,
    item: "Food Supplies (24 units)",
    from: "Food Bank Center",
    to: "Relief Center - 456 Oak Ave",
    status: "pending",
    priority: "urgent",
    estimatedTime: "2 hours",
  },
  {
    id: 3,
    item: "Medical Kits",
    from: "Medical Depot",
    to: "Emergency Shelter - 789 Pine Rd",
    status: "ready",
    priority: "medium",
    estimatedTime: "1 hour",
  },
];

const inventory = [
  { location: "Downtown Warehouse", items: 234, capacity: 500, status: "good" },
  { location: "North Distribution Center", items: 456, capacity: 600, status: "good" },
  { location: "South Storage Facility", items: 512, capacity: 550, status: "high" },
  { location: "East Collection Point", items: 123, capacity: 400, status: "low" },
];

export function LogisticsDashboard() {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-transit":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "ready":
        return "bg-green-100 text-green-800 border-green-200";
      case "completed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "low":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getInventoryColor = (status: string) => {
    switch (status) {
      case "high":
        return "text-orange-600";
      case "good":
        return "text-green-600";
      case "low":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Logistics Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage deliveries and inventory</p>
        </div>
        <Button
          onClick={() => navigate("/logistics/panel")}
          className="bg-red-500 hover:bg-red-600 w-full md:w-auto"
        >
          <Truck className="w-4 h-4 mr-2" />
          Delivery Panel
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Active Deliveries</CardDescription>
            <CardTitle className="text-3xl">12</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-blue-600">
              <Truck className="w-4 h-4" />
              <span>On the road</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Pending Pickups</CardDescription>
            <CardTitle className="text-3xl">8</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-yellow-600">
              <Clock className="w-4 h-4" />
              <span>Awaiting pickup</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Completed Today</CardDescription>
            <CardTitle className="text-3xl">24</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span>Successfully delivered</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Inventory</CardDescription>
            <CardTitle className="text-3xl">1,325</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Package className="w-4 h-4" />
              <span>Items in stock</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Urgent Deliveries */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <CardTitle>Priority Deliveries</CardTitle>
          </div>
          <CardDescription>High-priority and urgent deliveries requiring immediate attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {deliveries.map((delivery) => (
              <div
                key={delivery.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-red-300 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{delivery.item}</h3>
                      <Badge className={getPriorityColor(delivery.priority)}>
                        {delivery.priority}
                      </Badge>
                      <Badge className={getStatusColor(delivery.status)}>
                        {delivery.status.replace("-", " ")}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">From: {delivery.from}</p>
                          <p>To: {delivery.to}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="text-sm text-gray-600">
                      <Clock className="w-3 h-3 inline mr-1" />
                      ETA: {delivery.estimatedTime}
                    </div>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Inventory Status */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Status</CardTitle>
          <CardDescription>Current stock levels across all locations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {inventory.map((location, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-900">{location.location}</h3>
                    <p className="text-sm text-gray-600">
                      {location.items} / {location.capacity} items
                    </p>
                  </div>
                  <span className={`text-sm font-medium ${getInventoryColor(location.status)}`}>
                    {Math.round((location.items / location.capacity) * 100)}% capacity
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      location.status === "high"
                        ? "bg-orange-500"
                        : location.status === "good"
                        ? "bg-green-500"
                        : "bg-blue-500"
                    }`}
                    style={{ width: `${(location.items / location.capacity) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

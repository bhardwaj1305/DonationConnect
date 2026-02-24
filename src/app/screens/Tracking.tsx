import { useState } from "react";
import { MapPin, Package, Truck, CheckCircle, Clock, Navigation } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";

const trackingData = [
  {
    id: "DON-2024-001",
    item: "Winter Clothes Package",
    quantity: "15 items",
    status: "delivered",
    currentLocation: "Delivered to Community Shelter",
    recipient: "Sarah Johnson",
    timeline: [
      {
        status: "Donation Listed",
        location: "Your Location",
        timestamp: "Feb 20, 2026 - 10:00 AM",
        completed: true,
      },
      {
        status: "Pickup Scheduled",
        location: "Downtown Warehouse",
        timestamp: "Feb 21, 2026 - 2:00 PM",
        completed: true,
      },
      {
        status: "In Transit",
        location: "En route to destination",
        timestamp: "Feb 22, 2026 - 9:00 AM",
        completed: true,
      },
      {
        status: "Delivered",
        location: "Community Shelter, 456 Oak Ave",
        timestamp: "Feb 22, 2026 - 11:30 AM",
        completed: true,
      },
    ],
  },
  {
    id: "DON-2024-002",
    item: "Food Supplies",
    quantity: "24 units",
    status: "in-transit",
    currentLocation: "En route to Relief Center",
    recipient: "Mike Chen",
    estimatedDelivery: "Feb 24, 2026 - 3:00 PM",
    timeline: [
      {
        status: "Donation Listed",
        location: "Your Location",
        timestamp: "Feb 22, 2026 - 8:00 AM",
        completed: true,
      },
      {
        status: "Pickup Scheduled",
        location: "Food Bank Center",
        timestamp: "Feb 23, 2026 - 10:00 AM",
        completed: true,
      },
      {
        status: "In Transit",
        location: "En route to destination",
        timestamp: "Feb 24, 2026 - 1:00 PM",
        completed: true,
        current: true,
      },
      {
        status: "Delivered",
        location: "Relief Center, 321 Elm St",
        timestamp: "Estimated: Feb 24, 2026 - 3:00 PM",
        completed: false,
      },
    ],
  },
  {
    id: "DON-2024-003",
    item: "Medical Kits",
    quantity: "10 kits",
    status: "pending",
    currentLocation: "Awaiting Pickup",
    recipient: "Emergency Shelter",
    timeline: [
      {
        status: "Donation Listed",
        location: "Your Location",
        timestamp: "Feb 23, 2026 - 3:00 PM",
        completed: true,
      },
      {
        status: "Pickup Scheduled",
        location: "Medical Depot",
        timestamp: "Pending",
        completed: false,
        current: true,
      },
      {
        status: "In Transit",
        location: "En route to destination",
        timestamp: "Pending",
        completed: false,
      },
      {
        status: "Delivered",
        location: "Emergency Shelter",
        timestamp: "Pending",
        completed: false,
      },
    ],
  },
];

export function Tracking() {
  const [searchId, setSearchId] = useState("");
  const [selectedTracking, setSelectedTracking] = useState(trackingData[0]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock search
    const found = trackingData.find((item) => item.id === searchId.toUpperCase());
    if (found) {
      setSelectedTracking(found);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "in-transit":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "in-transit":
        return <Truck className="w-5 h-5 text-blue-500" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Track Donations</h1>
        <p className="text-gray-600 mt-1">Monitor the status of your donations in real-time</p>
      </div>

      {/* Search Box */}
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="trackingId" className="sr-only">
                Tracking ID
              </Label>
              <Input
                id="trackingId"
                placeholder="Enter tracking ID (e.g., DON-2024-001)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
            </div>
            <Button type="submit" className="bg-red-500 hover:bg-red-600">
              <Navigation className="w-4 h-4 mr-2" />
              Track
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* All Donations List */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Your Donations</CardTitle>
              <CardDescription>Click to view tracking details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {trackingData.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedTracking(item)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    selectedTracking.id === item.id
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{item.item}</p>
                      <p className="text-xs text-gray-600">{item.id}</p>
                    </div>
                    <Badge className={getStatusColor(item.status)} variant="outline">
                      {item.status.replace("-", " ")}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500">{item.currentLocation}</p>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Detailed Tracking View */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">{selectedTracking.item}</CardTitle>
                  <CardDescription className="mt-2">
                    Tracking ID: {selectedTracking.id}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(selectedTracking.status)}
                  <Badge className={getStatusColor(selectedTracking.status)}>
                    {selectedTracking.status.replace("-", " ")}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Current Status Card */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-500 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">Current Status</h3>
                    <p className="text-sm text-gray-700">{selectedTracking.currentLocation}</p>
                    {selectedTracking.estimatedDelivery && (
                      <p className="text-sm text-gray-600 mt-2">
                        <Clock className="w-3 h-3 inline mr-1" />
                        Estimated Delivery: {selectedTracking.estimatedDelivery}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Quantity</p>
                  <p className="font-semibold text-gray-900">{selectedTracking.quantity}</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Recipient</p>
                  <p className="font-semibold text-gray-900">{selectedTracking.recipient}</p>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Tracking Timeline</h3>
                <div className="space-y-4">
                  {selectedTracking.timeline.map((event, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            event.completed
                              ? "bg-green-500"
                              : event.current
                              ? "bg-blue-500"
                              : "bg-gray-300"
                          }`}
                        >
                          {event.completed ? (
                            <CheckCircle className="w-5 h-5 text-white" />
                          ) : event.current ? (
                            <Truck className="w-5 h-5 text-white" />
                          ) : (
                            <Clock className="w-5 h-5 text-white" />
                          )}
                        </div>
                        {index < selectedTracking.timeline.length - 1 && (
                          <div
                            className={`w-0.5 h-12 ${
                              event.completed ? "bg-green-500" : "bg-gray-300"
                            }`}
                          />
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <h4
                          className={`font-semibold ${
                            event.completed || event.current ? "text-gray-900" : "text-gray-500"
                          }`}
                        >
                          {event.status}
                        </h4>
                        <p className="text-sm text-gray-600">{event.location}</p>
                        <p className="text-xs text-gray-500 mt-1">{event.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              {selectedTracking.status === "delivered" && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <h3 className="font-semibold text-green-900">Delivery Complete!</h3>
                  </div>
                  <p className="text-sm text-green-800">
                    Thank you for your donation. Your contribution has been successfully delivered
                    and is making a difference!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

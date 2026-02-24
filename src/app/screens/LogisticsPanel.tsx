import { useState } from "react";
import { useNavigate } from "react-router";
import { Truck, MapPin, Clock, Package, ArrowLeft, CheckCircle, Navigation } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

const scheduledDeliveries = [
  {
    id: "DEL-001",
    item: "Winter Clothes Package (20 items)",
    pickup: "Downtown Warehouse, 123 Main St",
    delivery: "Community Shelter, 456 Oak Ave",
    scheduledTime: "10:00 AM",
    status: "scheduled",
    distance: "3.2 km",
    recipient: "Sarah Johnson",
    phone: "+1 234-567-8900",
  },
  {
    id: "DEL-002",
    item: "Food Supplies (48 units)",
    pickup: "Food Bank Center, 789 Pine Rd",
    delivery: "Relief Center, 321 Elm St",
    scheduledTime: "11:30 AM",
    status: "scheduled",
    distance: "5.7 km",
    recipient: "Mike Chen",
    phone: "+1 234-567-8901",
  },
];

const activeDeliveries = [
  {
    id: "DEL-003",
    item: "Medical Kits (15 units)",
    pickup: "Medical Depot, 555 Health Blvd",
    delivery: "Emergency Shelter, 999 Care Lane",
    startedAt: "9:15 AM",
    status: "in-transit",
    distance: "4.1 km",
    progress: 65,
    recipient: "Emma Davis",
    phone: "+1 234-567-8902",
  },
];

const completedDeliveries = [
  {
    id: "DEL-004",
    item: "Hygiene Kits (10 units)",
    delivery: "Community Center, 777 Hope St",
    completedAt: "8:45 AM",
    recipient: "John Smith",
    rating: 5,
  },
  {
    id: "DEL-005",
    item: "Blankets (25 items)",
    delivery: "Homeless Shelter, 111 Refuge Ave",
    completedAt: "8:20 AM",
    recipient: "Lisa Wong",
    rating: 5,
  },
];

export function LogisticsPanel() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("scheduled");

  const handleStartDelivery = (deliveryId: string) => {
    console.log("Starting delivery:", deliveryId);
    // Mock action
  };

  const handleCompleteDelivery = (deliveryId: string) => {
    console.log("Completing delivery:", deliveryId);
    // Mock action
  };

  return (
    <div className="space-y-6">
      <div>
        <Button
          variant="ghost"
          onClick={() => navigate("/logistics")}
          className="mb-4 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Delivery Panel</h1>
            <p className="text-gray-600 mt-1">Manage and track delivery operations</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="w-full md:w-auto">
              <Navigation className="w-4 h-4 mr-2" />
              Open Maps
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{activeDeliveries.length}</div>
              <div className="text-sm text-gray-600 mt-1">Active</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">{scheduledDeliveries.length}</div>
              <div className="text-sm text-gray-600 mt-1">Scheduled</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{completedDeliveries.length}</div>
              <div className="text-sm text-gray-600 mt-1">Completed Today</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">12.8 km</div>
              <div className="text-sm text-gray-600 mt-1">Total Distance</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delivery Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Deliveries</CardTitle>
          <CardDescription>View and manage delivery operations</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="scheduled">
                Scheduled ({scheduledDeliveries.length})
              </TabsTrigger>
              <TabsTrigger value="active">
                Active ({activeDeliveries.length})
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completed ({completedDeliveries.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="scheduled" className="space-y-4 mt-4">
              {scheduledDeliveries.map((delivery) => (
                <Card key={delivery.id}>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-gray-900">{delivery.id}</h3>
                            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                              Scheduled
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{delivery.item}</p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleStartDelivery(delivery.id)}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          Start Delivery
                        </Button>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 mt-0.5 text-blue-500" />
                          <div>
                            <p className="font-medium text-gray-700">Pickup</p>
                            <p className="text-gray-600">{delivery.pickup}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 mt-0.5 text-red-500" />
                          <div>
                            <p className="font-medium text-gray-700">Delivery</p>
                            <p className="text-gray-600">{delivery.delivery}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{delivery.scheduledTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Navigation className="w-4 h-4" />
                          <span>{delivery.distance}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Package className="w-4 h-4" />
                          <span>Recipient: {delivery.recipient}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="active" className="space-y-4 mt-4">
              {activeDeliveries.map((delivery) => (
                <Card key={delivery.id}>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-gray-900">{delivery.id}</h3>
                            <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                              In Transit
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{delivery.item}</p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleCompleteDelivery(delivery.id)}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Complete
                        </Button>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Delivery Progress</span>
                          <span className="font-medium">{delivery.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all"
                            style={{ width: `${delivery.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 mt-0.5 text-red-500" />
                          <div>
                            <p className="font-medium text-gray-700">Destination</p>
                            <p className="text-gray-600">{delivery.delivery}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>Started: {delivery.startedAt}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Navigation className="w-4 h-4" />
                          <span>{delivery.distance}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Package className="w-4 h-4" />
                          <span>{delivery.recipient}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4 mt-4">
              {completedDeliveries.map((delivery) => (
                <Card key={delivery.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{delivery.id}</h3>
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            Completed
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{delivery.item}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{delivery.delivery}</span>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>{delivery.completedAt}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Package className="w-4 h-4" />
                            <span>{delivery.recipient}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(delivery.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400">★</span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  MapPin,
  Droplets,
  Wifi,
  WifiOff,
  CheckCircle,
  AlertTriangle,
  Clock,
  Thermometer,
  BarChart3,
  ArrowLeft,
  Shield,
  TrendingUp,
  Activity,
  Zap,
} from "lucide-react";

// Simulated map component (same as SensorMap but public-facing)
const MapContainer = ({
  children,
  center,
  zoom,
  style,
}: any) => (
  <div
    style={style}
    className="relative bg-blue-50 rounded-lg overflow-hidden border-2 border-dashed border-blue-200"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-blue-100 to-green-200"></div>
    <div className="relative z-10 h-full flex items-center justify-center">
      <div className="text-center text-blue-600">
        <MapPin className="h-12 w-12 mx-auto mb-2" />
        <p className="font-medium">
          HydroHack Monitoring Network
        </p>
        <p className="text-sm opacity-75">
          Public transparency view
        </p>
      </div>
    </div>
    {children}
  </div>
);

const Marker = ({ position, children }: any) => (
  <div
    className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2"
    style={{
      left: `${((position[1] + 28.2) / 0.6) * 100}%`,
      top: `${((25.8 - position[0]) / 0.4) * 100}%`,
    }}
  >
    {children}
  </div>
);

interface PublicSensor {
  id: string;
  name: string;
  position: [number, number];
  status: "online" | "offline" | "maintenance";
  type: "flow" | "quality" | "level" | "pressure";
  location: string;
  lastUpdate: string;
  publicMetrics: {
    status: string;
    efficiency: number;
  };
}

// Public view with limited sensor data
const publicSensors: PublicSensor[] = [
  {
    id: "TWW001",
    name: "Mamelodi Monitoring Station",
    position: [-25.7308, 28.3228],
    status: "online",
    type: "flow",
    location: "Mamelodi Extension 2",
    lastUpdate: new Date(
      Date.now() - 5 * 60 * 1000,
    ).toISOString(),
    publicMetrics: {
      status: "Normal Operation",
      efficiency: 92,
    },
  },
  {
    id: "TWW002",
    name: "Soshanguve Water Quality",
    position: [-25.5372, 28.1103],
    status: "online",
    type: "quality",
    location: "Soshanguve Block L",
    lastUpdate: new Date(
      Date.now() - 2 * 60 * 1000,
    ).toISOString(),
    publicMetrics: {
      status: "Excellent Quality",
      efficiency: 88,
    },
  },
  {
    id: "TWW003",
    name: "Pretoria CBD Monitor",
    position: [-25.7479, 28.2293],
    status: "maintenance",
    type: "pressure",
    location: "Pretoria CBD, Church Street",
    lastUpdate: new Date(
      Date.now() - 30 * 60 * 1000,
    ).toISOString(),
    publicMetrics: {
      status: "Scheduled Maintenance",
      efficiency: 0,
    },
  },
  {
    id: "TWW004",
    name: "Centurion Station",
    position: [-25.8598, 28.1888],
    status: "online",
    type: "flow",
    location: "Centurion Central",
    lastUpdate: new Date(
      Date.now() - 8 * 60 * 1000,
    ).toISOString(),
    publicMetrics: { status: "Optimal Flow", efficiency: 95 },
  },
  {
    id: "TWW007",
    name: "Wonderboom Station",
    position: [-25.6833, 28.1333],
    status: "online",
    type: "flow",
    location: "Wonderboom",
    lastUpdate: new Date(
      Date.now() - 1 * 60 * 1000,
    ).toISOString(),
    publicMetrics: {
      status: "Good Performance",
      efficiency: 91,
    },
  },
  {
    id: "TWW008",
    name: "Ga-Rankuwa Monitor",
    position: [-25.6333, 27.9833],
    status: "online",
    type: "pressure",
    location: "Ga-Rankuwa",
    lastUpdate: new Date(
      Date.now() - 3 * 60 * 1000,
    ).toISOString(),
    publicMetrics: {
      status: "Stable Pressure",
      efficiency: 87,
    },
  },
];

const statusColors = {
  online: "bg-green-500",
  offline: "bg-red-500",
  maintenance: "bg-blue-500",
};

const statusLabels = {
  online: "Online",
  offline: "Offline",
  maintenance: "Maintenance",
};

const typeIcons = {
  flow: Droplets,
  quality: BarChart3,
  level: Thermometer,
  pressure: Zap,
};

interface PublicSensorViewProps {
  onBack: () => void;
}

export function PublicSensorView({
  onBack,
}: PublicSensorViewProps) {
  const [sensors] = useState<PublicSensor[]>(publicSensors);
  const [selectedSensor, setSelectedSensor] =
    useState<PublicSensor | null>(null);

  const getSensorIcon = (sensor: PublicSensor) => {
    const Icon = typeIcons[sensor.type];
    const isSelected = selectedSensor?.id === sensor.id;

    return (
      <div
        className={`relative cursor-pointer transform transition-all duration-200 ${isSelected ? "scale-125" : "hover:scale-110"}`}
        onClick={() =>
          setSelectedSensor(
            selectedSensor?.id === sensor.id ? null : sensor,
          )
        }
      >
        <div
          className={`w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${statusColors[sensor.status]}`}
        >
          <Icon className="h-3 w-3 text-white" />
        </div>

        {/* Pulse animation for online sensors */}
        {sensor.status === "online" && (
          <div
            className={`absolute inset-0 w-6 h-6 rounded-full ${statusColors[sensor.status]} animate-ping opacity-20`}
          ></div>
        )}

        {/* Popup */}
        {isSelected && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-30">
            <div className="bg-white rounded-lg shadow-lg border p-3 min-w-40 max-w-xs">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">
                    {sensor.name}
                  </h4>
                  <Badge
                    className={statusColors[
                      sensor.status
                    ].replace("bg-", "bg-opacity-20 text-")}
                    variant="secondary"
                  >
                    {statusLabels[sensor.status]}
                  </Badge>
                </div>

                <p className="text-xs text-gray-600">
                  {sensor.location}
                </p>

                <div className="text-xs">
                  <span className="text-gray-500">Status:</span>
                  <span className="ml-1 font-medium">
                    {sensor.publicMetrics.status}
                  </span>
                </div>

                {sensor.publicMetrics.efficiency > 0 && (
                  <div className="text-xs">
                    <span className="text-gray-500">
                      Efficiency:
                    </span>
                    <span className="ml-1 font-medium">
                      {sensor.publicMetrics.efficiency}%
                    </span>
                  </div>
                )}

                <div className="pt-2 border-t">
                  <span className="text-xs text-gray-500">
                    Updated{" "}
                    {new Date(
                      sensor.lastUpdate,
                    ).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const getStatusCounts = () => {
    return {
      total: sensors.length,
      online: sensors.filter((s) => s.status === "online")
        .length,
      offline: sensors.filter((s) => s.status === "offline")
        .length,
      maintenance: sensors.filter(
        (s) => s.status === "maintenance",
      ).length,
    };
  };

  const statusCounts = getStatusCounts();
  const averageEfficiency = Math.round(
    sensors
      .filter((s) => s.publicMetrics.efficiency > 0)
      .reduce((acc, s) => acc + s.publicMetrics.efficiency, 0) /
      sensors.filter((s) => s.publicMetrics.efficiency > 0)
        .length,
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  Water Network Monitor
                </h1>
                <p className="text-sm text-blue-600">
                  Public Transparency View
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-gray-600">
                Public Access
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Tshwane Water Monitoring Network
          </h2>
          <p className="text-gray-600">
            Transparent view of our IoT sensor network
            monitoring water usage across the city.
          </p>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {statusCounts.total}
              </div>
              <div className="text-sm text-gray-600">
                Active Sensors
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {statusCounts.online}
              </div>
              <div className="text-sm text-gray-600">
                Online Now
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {averageEfficiency}%
              </div>
              <div className="text-sm text-gray-600">
                Avg Efficiency
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                24/7
              </div>
              <div className="text-sm text-gray-600">
                Monitoring
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span>Sensor Network Distribution</span>
                </CardTitle>
                <CardDescription>
                  Real-time status of water monitoring sensors
                  across Tshwane
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MapContainer
                  center={[-25.7479, 28.2293]}
                  zoom={11}
                  style={{ height: "400px", width: "100%" }}
                >
                  {sensors.map((sensor) => (
                    <Marker
                      key={sensor.id}
                      position={sensor.position}
                    >
                      {getSensorIcon(sensor)}
                    </Marker>
                  ))}
                </MapContainer>

                {/* Map Legend */}
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2 flex items-center">
                    <Activity className="h-4 w-4 mr-2" />
                    Network Status
                  </h4>
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span>
                        Online ({statusCounts.online})
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span>
                        Maintenance ({statusCounts.maintenance})
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span>
                        Offline ({statusCounts.offline})
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sensor List */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Monitoring Stations</CardTitle>
                <CardDescription>
                  Live status from water monitoring stations
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[400px] overflow-y-auto">
                  {sensors.map((sensor, index) => {
                    const Icon = typeIcons[sensor.type];
                    const isLast = index === sensors.length - 1;

                    return (
                      <div
                        key={sensor.id}
                        className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${!isLast ? "border-b" : ""} ${selectedSensor?.id === sensor.id ? "bg-blue-50" : ""}`}
                        onClick={() =>
                          setSelectedSensor(sensor)
                        }
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-3 h-3 rounded-full ${statusColors[sensor.status]}`}
                            ></div>
                            <div>
                              <h4 className="font-medium text-sm">
                                {sensor.name}
                              </h4>
                              <p className="text-xs text-gray-600">
                                {sensor.location}
                              </p>
                            </div>
                          </div>
                          <Icon className="h-4 w-4 text-gray-400" />
                        </div>

                        <div className="text-xs text-gray-600 mb-1">
                          {sensor.publicMetrics.status}
                        </div>

                        {sensor.publicMetrics.efficiency >
                          0 && (
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">
                              Performance:
                            </span>
                            <span className="font-medium">
                              {sensor.publicMetrics.efficiency}%
                            </span>
                          </div>
                        )}

                        <div className="flex justify-between items-center mt-2">
                          <Badge
                            variant="secondary"
                            className={statusColors[
                              sensor.status
                            ].replace(
                              "bg-",
                              "bg-opacity-20 text-",
                            )}
                          >
                            {statusLabels[sensor.status]}
                          </Badge>

                          <span className="text-xs text-gray-500">
                            {new Date(
                              sensor.lastUpdate,
                            ).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Info Box */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-base flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span>Transparency Notice</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  This public view shows general status and
                  performance metrics of our water monitoring
                  network to promote transparency and community
                  awareness.
                </p>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span>Real-time status updates</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span>Performance metrics</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span>Data privacy protected</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span>Network Performance Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  94.2%
                </div>
                <div className="text-sm text-gray-600">
                  Network Uptime
                </div>
                <div className="text-xs text-green-600 mt-1">
                  ↑ 2.1% this month
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600 mb-1">
                  15.4M
                </div>
                <div className="text-sm text-gray-600">
                  Liters Monitored
                </div>
                <div className="text-xs text-blue-600 mt-1">
                  This month
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  247
                </div>
                <div className="text-sm text-gray-600">
                  Sites Covered
                </div>
                <div className="text-xs text-green-600 mt-1">
                  ↑ 5 new sites
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
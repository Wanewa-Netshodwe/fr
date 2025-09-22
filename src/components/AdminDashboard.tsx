import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import {
  Shield,
  LogOut,
  Bell,
  Search,
  Filter,
  MapPin,
  Calendar,
  Droplets,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  FileText,
  Settings,
  BarChart3,
  Activity,
  Zap,
} from "lucide-react";
import { TicketBoard } from "./TicketBoard";
import { WorkDeployment } from "./WorkDeployment";
import { SensorDashboard } from "./SensorDashboard";
import { SensorMap } from "./SensorMap";

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({
  onLogout,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for dashboard metrics
  const metrics = {
    totalCarWashes: 247,
    compliantRate: 78,
    waterSaved: 15420,
    activeTickets: 23,
    resolvedToday: 8,
    deployedTeams: 12,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b shadow-sm">
        <div className="px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="bg-red-600 p-2 rounded-lg">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  Government Admin Portal
                </h1>
                <p className="text-xs text-red-600 font-medium">
                  CONFIDENTIAL ACCESS
                </p>
              </div>
            </div>
            <Badge variant="destructive" className="text-xs">
              RESTRICTED
            </Badge>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Search className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="relative"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div className="text-sm">
              <p className="font-medium">Municipal Admin</p>
              <p className="text-xs text-gray-500">
                Session: 1h 23m
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <nav className="w-64 bg-white border-r shadow-sm h-screen sticky top-16">
          <div className="p-4">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              orientation="vertical"
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-1 gap-1 bg-gray-50 p-1 h-auto">
                <TabsTrigger
                  value="overview"
                  className="justify-start w-full"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Dashboard Overview
                </TabsTrigger>
                <TabsTrigger
                  value="tickets"
                  className="justify-start w-full"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Ticket Tracking
                </TabsTrigger>
                <TabsTrigger
                  value="deployment"
                  className="justify-start w-full"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Work Deployment
                </TabsTrigger>
                <TabsTrigger
                  value="sensors"
                  className="justify-start w-full"
                >
                  <Activity className="h-4 w-4 mr-2" />
                  Sensor Management
                </TabsTrigger>
                <TabsTrigger
                  value="sensormap"
                  className="justify-start w-full"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Sensor Location Map
                </TabsTrigger>
                <TabsTrigger
                  value="enforcement"
                  className="justify-start w-full"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Enforcement Actions
                </TabsTrigger>
                <TabsTrigger
                  value="reports"
                  className="justify-start w-full"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Reports & Analytics
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          <Tabs value={activeTab} className="w-full">
            {/* Dashboard Overview */}
            <TabsContent value="overview" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Municipal Water Oversight Dashboard
                </h2>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Last 30 Days
                  </Button>
                </div>
              </div>

              {/* Key Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Car Washes
                    </CardTitle>
                    <Droplets className="h-4 w-4 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {metrics.totalCarWashes}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      +12% from last month
                    </p>
                    <Progress value={85} className="mt-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Compliance Rate
                    </CardTitle>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {metrics.compliantRate}%
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Target: 85%
                    </p>
                    <Progress
                      value={metrics.compliantRate}
                      className="mt-2"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Water Saved (L)
                    </CardTitle>
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {metrics.waterSaved.toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      This month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Tickets
                    </CardTitle>
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {metrics.activeTickets}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {metrics.resolvedToday} resolved today
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5 text-orange-600" />
                    <span>Real-time Alerts</span>
                  </CardTitle>
                  <CardDescription>
                    Critical issues requiring immediate
                    attention
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="bg-red-100 p-1 rounded-full">
                          <Zap className="h-4 w-4 text-red-600" />
                        </div>
                        <div>
                          <p className="font-medium text-red-900">
                            High Water Pressure Detected
                          </p>
                          <p className="text-sm text-red-700">
                            Marabastad Car Wash #247 - Possible
                            leak
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="destructive">
                        Deploy Team
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="bg-orange-100 p-1 rounded-full">
                          <AlertTriangle className="h-4 w-4 text-orange-600" />
                        </div>
                        <div>
                          <p className="font-medium text-orange-900">
                            Payment Overdue
                          </p>
                          <p className="text-sm text-orange-700">
                            Hammanskraal Operators - 3
                            facilities affected
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Send Notice
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 p-1 rounded-full">
                          <MapPin className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-blue-900">
                            New Citizen Report
                          </p>
                          <p className="text-sm text-blue-700">
                            Unauthorized water usage reported in
                            Soshanguve
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Investigate
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Interactive Sensor Map Overview */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>IoT Sensor Network Overview</CardTitle>
                      <CardDescription>
                        Real-time monitoring across Tshwane water infrastructure
                      </CardDescription>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setActiveTab("sensormap")}
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      Full Map View
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Mini sensor stats */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-green-50 p-3 rounded-lg text-center">
                          <div className="text-lg font-bold text-green-600">6</div>
                          <div className="text-xs text-green-600">Online</div>
                        </div>
                        <div className="bg-red-50 p-3 rounded-lg text-center">
                          <div className="text-lg font-bold text-red-600">1</div>
                          <div className="text-xs text-red-600">Offline</div>
                        </div>
                        <div className="bg-yellow-50 p-3 rounded-lg text-center">
                          <div className="text-lg font-bold text-yellow-600">1</div>
                          <div className="text-xs text-yellow-600">Warning</div>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg text-center">
                          <div className="text-lg font-bold text-blue-600">1</div>
                          <div className="text-xs text-blue-600">Maintenance</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Recent Alerts</h4>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2 text-xs">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span className="text-gray-600">TWW005 - Connection Lost</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            <span className="text-gray-600">TWW003 - Low Battery</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-gray-600">TWW006 - Scheduled Maintenance</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Simplified map preview */}
                    <div className="lg:col-span-2">
                      <div className="relative bg-gradient-to-br from-green-100 via-blue-100 to-green-200 rounded-lg h-48 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center text-blue-600">
                            <MapPin className="h-8 w-8 mx-auto mb-2" />
                            <p className="font-medium">Tshwane Sensor Network</p>
                            <p className="text-xs opacity-75">8 IoT sensors monitoring water usage</p>
                          </div>
                        </div>
                        
                        {/* Simulated sensor dots */}
                        <div className="absolute top-6 left-12 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <div className="absolute top-12 right-16 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <div className="absolute bottom-16 left-16 w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="absolute bottom-8 right-12 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <div className="absolute top-20 left-1/2 w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                        <div className="absolute bottom-12 left-1/3 w-3 h-3 bg-blue-500 rounded-full"></div>
                        <div className="absolute top-16 right-1/3 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <div className="absolute bottom-20 right-1/4 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        
                        {/* Legend */}
                        <div className="absolute bottom-2 left-2 bg-white bg-opacity-90 rounded px-2 py-1">
                          <div className="flex items-center space-x-3 text-xs">
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span>Online</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              <span>Offline</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                              <span>Warning</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Ticket Tracking */}
            <TabsContent value="tickets">
              <TicketBoard />
            </TabsContent>

            {/* Work Deployment */}
            <TabsContent value="deployment">
              <WorkDeployment />
            </TabsContent>

            {/* Sensor Management */}
            <TabsContent value="sensors">
              <SensorDashboard />
            </TabsContent>

            {/* Sensor Location Map */}
            <TabsContent value="sensormap">
              <SensorMap />
            </TabsContent>

            {/* Other tabs would be implemented similarly */}
            <TabsContent value="enforcement">
              <Card>
                <CardHeader>
                  <CardTitle>Enforcement Actions</CardTitle>
                  <CardDescription>
                    Bylaw violations and compliance enforcement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    Enforcement management interface would be
                    implemented here...
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports">
              <Card>
                <CardHeader>
                  <CardTitle>Reports & Analytics</CardTitle>
                  <CardDescription>
                    Generate compliance reports and data exports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    Analytics and reporting interface would be
                    implemented here...
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
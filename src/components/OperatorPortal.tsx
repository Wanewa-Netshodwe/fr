import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import {
  User,
  LogOut,
  Droplets,
  DollarSign,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Award,
  QrCode,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Building,
  CreditCard,
} from "lucide-react";
import { useNavigate } from "react-router";

const momo_key_pub = "b0dc3b672e7a4517a52d4b0b2b6a6738";
const momo_key_prv = "cdfea79acdea4d729c01278d866ae205";

interface OperatorPortalProps {
  onLogout: () => void;
}

interface BusinessData {
  businessName: string;
  ownerName: string;
  registrationNumber: string;
  location: string;
  phone: string;
  email: string;
  waterSource: "municipal" | "borehole" | "mixed";
  registrationStatus: "pending" | "approved" | "rejected";
  complianceScore: number;
}

interface UsageData {
  currentMonth: {
    usage: number;
    cost: number;
    efficiency: number;
  };
  previousMonth: {
    usage: number;
    cost: number;
    efficiency: number;
  };
  yearToDate: {
    usage: number;
    cost: number;
    savings: number;
  };
}

const mockBusinessData: BusinessData = {
  businessName: "Sunshine Car Wash",
  ownerName: "Thabo Mthembu",
  registrationNumber: "CW-2024-0156",
  location: "Mamelodi Extension 2, Pretoria",
  phone: "+27 82 456 7890",
  email: "thabo.mthembu@gmail.com",
  waterSource: "municipal",
  registrationStatus: "approved",
  complianceScore: 87,
};

const mockUsageData: UsageData = {
  currentMonth: {
    usage: 2840,
    cost: 1420,
    efficiency: 78,
  },
  previousMonth: {
    usage: 3150,
    cost: 1575,
    efficiency: 72,
  },
  yearToDate: {
    usage: 34200,
    cost: 17100,
    savings: 2850,
  },
};

const efficiencyTips = [
  {
    title: "Implement Water Recycling",
    description:
      "Install a water recycling system to reuse rinse water. Can reduce consumption by 30-40%.",
    impact: "High",
    cost: "Medium",
  },
  {
    title: "Use High-Pressure, Low-Volume Nozzles",
    description:
      "Replace standard nozzles with high-pressure alternatives to reduce water usage per wash.",
    impact: "Medium",
    cost: "Low",
  },
  {
    title: "Install Automatic Shut-off Valves",
    description: "Prevent water waste when equipment is not in active use.",
    impact: "Medium",
    cost: "Low",
  },
  {
    title: "Train Staff on Water Conservation",
    description:
      "Educate workers on efficient washing techniques and water-saving practices.",
    impact: "Medium",
    cost: "Very Low",
  },
];

export function OperatorPortal({ onLogout }: OperatorPortalProps) {
  const [businessData, setBusinessData] =
    useState<BusinessData>(mockBusinessData);
  const [usageData, setUsageData] = useState<UsageData>(mockUsageData);
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  const usageChange =
    ((usageData.currentMonth.usage - usageData.previousMonth.usage) /
      usageData.previousMonth.usage) *
    100;
  const costChange =
    ((usageData.currentMonth.cost - usageData.previousMonth.cost) /
      usageData.previousMonth.cost) *
    100;
  const efficiencyChange =
    usageData.currentMonth.efficiency - usageData.previousMonth.efficiency;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Droplets className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">
                    Car Wash Portal
                  </h1>
                  <p className="text-sm text-blue-600">
                    {businessData.businessName}
                  </p>
                </div>
              </div>
              <Badge
                className={
                  businessData.registrationStatus === "approved"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }
                variant="secondary"
              >
                {businessData.registrationStatus === "approved"
                  ? "Registered"
                  : "Pending"}
              </Badge>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-right">
                <p className="font-medium">{businessData.ownerName}</p>
                <p className="text-gray-500">
                  {businessData.registrationNumber}
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={()=>{
                navigate("/")
              }}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="registration">Registration</TabsTrigger>
            <TabsTrigger value="efficiency">Efficiency Tips</TabsTrigger>
            <TabsTrigger value="subsidies">Subsidies</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Water Usage Dashboard
              </h2>
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                January 2024
              </Button>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Water Usage
                      </p>
                      <p className="text-2xl font-bold text-blue-600">
                        {usageData.currentMonth.usage}L
                      </p>
                      <div className="flex items-center mt-1">
                        {usageChange > 0 ? (
                          <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                        )}
                        <span
                          className={`text-sm ${
                            usageChange > 0 ? "text-red-500" : "text-green-500"
                          }`}
                        >
                          {Math.abs(usageChange).toFixed(1)}% from last month
                        </span>
                      </div>
                    </div>
                    <Droplets className="h-8 w-8 text-blue-600 opacity-75" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Monthly Cost
                      </p>
                      <p className="text-2xl font-bold text-green-600">
                        R{usageData.currentMonth.cost}
                      </p>
                      <div className="flex items-center mt-1">
                        {costChange > 0 ? (
                          <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                        )}
                        <span
                          className={`text-sm ${
                            costChange > 0 ? "text-red-500" : "text-green-500"
                          }`}
                        >
                          {Math.abs(costChange).toFixed(1)}% from last month
                        </span>
                      </div>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-600 opacity-75" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Efficiency Score
                      </p>
                      <p className="text-2xl font-bold text-blue-600">
                        {usageData.currentMonth.efficiency}%
                      </p>
                      <div className="flex items-center mt-1">
                        {efficiencyChange > 0 ? (
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                        )}
                        <span
                          className={`text-sm ${
                            efficiencyChange > 0
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {Math.abs(efficiencyChange)}pts from last month
                        </span>
                      </div>
                    </div>
                    <Award className="h-8 w-8 text-blue-600 opacity-75" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Compliance Score
                      </p>
                      <p className="text-2xl font-bold text-green-600">
                        {businessData.complianceScore}%
                      </p>
                      <p className="text-sm text-gray-500 mt-1">Target: 85%</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600 opacity-75" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Compliance Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Compliance Status</CardTitle>
                <CardDescription>
                  Your progress towards full compliance certification
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Water Source Registration
                    </span>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Payment Compliance
                    </span>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Waste Management Plan
                    </span>
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Efficiency Standards
                    </span>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">
                      Overall Progress
                    </span>
                    <span className="text-sm text-gray-500">
                      {businessData.complianceScore}%
                    </span>
                  </div>
                  <Progress
                    value={businessData.complianceScore}
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <QrCode className="h-5 w-5 text-blue-600" />
                  <span>Payment & Billing</span>
                </CardTitle>
                <CardDescription>
                  Manage your water usage payments and billing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Current Bill</h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">
                            Water Usage (January)
                          </span>
                          <span className="font-medium">
                            {usageData.currentMonth.usage}L
                          </span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">
                            Rate per Liter
                          </span>
                          <span className="font-medium">R0.50</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Total Amount</span>
                          <span className="text-lg font-bold text-green-600">
                            R{usageData.currentMonth.cost}
                          </span>
                        </div>
                      </div>
                      <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                        Pay Now
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="text-center">
                      <div className="bg-gray-100 p-8 rounded-lg mb-4">
                        <QrCode className="h-24 w-24 text-gray-400 mx-auto" />
                      </div>
                      <p className="text-sm text-gray-600">
                        Scan QR code for quick payment
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Payment ID: {businessData.registrationNumber}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Registration Tab */}
          <TabsContent value="registration" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Business Registration
              </h2>
              <p className="text-gray-600">
                Manage your car wash business registration and compliance
                information.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>
                  Update your business details and registration information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Business Name</Label>
                      <Input
                        id="businessName"
                        value={businessData.businessName}
                        onChange={(e) =>
                          setBusinessData({
                            ...businessData,
                            businessName: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ownerName">Owner Name</Label>
                      <Input
                        id="ownerName"
                        value={businessData.ownerName}
                        onChange={(e) =>
                          setBusinessData({
                            ...businessData,
                            ownerName: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={businessData.phone}
                        onChange={(e) =>
                          setBusinessData({
                            ...businessData,
                            phone: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={businessData.email}
                        onChange={(e) =>
                          setBusinessData({
                            ...businessData,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Business Location</Label>
                    <Input
                      id="location"
                      value={businessData.location}
                      onChange={(e) =>
                        setBusinessData({
                          ...businessData,
                          location: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="waterSource">Primary Water Source</Label>
                    <Select
                      value={businessData.waterSource}
                      onValueChange={(value: any) =>
                        setBusinessData({ ...businessData, waterSource: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="municipal">
                          Municipal Water
                        </SelectItem>
                        <SelectItem value="borehole">
                          Borehole/Ground Water
                        </SelectItem>
                        <SelectItem value="mixed">Mixed Sources</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Update Information
                    </Button>
                    <Button type="button" variant="outline">
                      Download Certificate
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Efficiency Tips Tab */}
          <TabsContent value="efficiency" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Water Efficiency Tips
              </h2>
              <p className="text-gray-600">
                Improve your water efficiency and reduce costs with these proven
                strategies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {efficiencyTips.map((tip, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <Lightbulb className="h-5 w-5 text-yellow-600" />
                        <CardTitle className="text-lg">{tip.title}</CardTitle>
                      </div>
                      <Badge
                        variant={
                          tip.impact === "High" ? "default" : "secondary"
                        }
                      >
                        {tip.impact} Impact
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{tip.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Implementation Cost: {tip.cost}
                      </span>
                      <Button variant="outline" size="sm">
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Subsidies Tab */}
          <TabsContent value="subsidies" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Green Technology Subsidies
              </h2>
              <p className="text-gray-600">
                Apply for subsidies to upgrade your car wash with
                water-efficient technology.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">
                  Available Subsidies & Incentives
                </CardTitle>
                <CardDescription>
                  Government programs to support water conservation and business
                  formalization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold text-green-600 mb-2">
                      Water Recycling System Subsidy
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Up to 50% funding for installing water recycling and
                      filtration systems.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Max Amount: R25,000
                      </span>
                      <Badge className="bg-green-100 text-green-800">
                        Available
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-3">
                      Apply Now
                    </Button>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold text-blue-600 mb-2">
                      Equipment Upgrade Grant
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Funding for high-efficiency nozzles, pressure washers, and
                      monitoring equipment.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Max Amount: R15,000
                      </span>
                      <Badge className="bg-blue-100 text-blue-800">
                        Available
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-3">
                      Apply Now
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Award className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-800 mb-1">
                        Green Certification Benefits
                      </h4>
                      <p className="text-sm text-green-700 mb-2">
                        Achieve full compliance and water efficiency targets to
                        unlock additional benefits:
                      </p>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Priority access to municipal tenders</li>
                        <li>• Reduced water tariff rates</li>
                        <li>• Marketing support and certification logo</li>
                        <li>• Access to business development programs</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import {
  MapPin,
  Camera,
  Shield,
  Droplets,
  Users,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  BarChart3,
  FileText,
  LogIn,
  UserPlus,
} from "lucide-react";
import { UserRole, AuthView } from "../App";
import { PublicSensorView } from "./PublicSensorView";

interface PublicLandingProps {
  onRoleChange: (role: UserRole) => void;
  onViewChange: (view: AuthView) => void;
  currentView: AuthView;
}

export function PublicLanding({
  onRoleChange,
  onViewChange,
  currentView,
}: PublicLandingProps) {
  // Show public sensor map if requested
  if (currentView === "sensors") {
    return (
      <PublicSensorView
        onBack={() => onViewChange("landing")}
      />
    );
  }
  const [reportForm, setReportForm] = useState({
    location: "",
    issueType: "",
    description: "",
    anonymous: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Droplets className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  HydroHack Solutions
                </h1>
                <p className="text-sm text-gray-600">
                  Metsi Ke Bophelo
                </p>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button
                variant="ghost"
                onClick={() => {
                  onRoleChange("citizen");
                  onViewChange("login");
                }}
                className="text-blue-600 hover:bg-blue-50"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  onRoleChange("citizen");
                  onViewChange("register");
                }}
                className="text-blue-600 border-blue-600 hover:bg-blue-50"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Register
              </Button>
              <Button
                variant="outline"
                onClick={() => onRoleChange("operator")}
                className="text-green-600 border-green-600 hover:bg-green-50"
              >
                Car Wash Portal
              </Button>
              <Button
                variant="outline"
                onClick={() => onRoleChange("admin")}
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                <Shield className="h-4 w-4 mr-2" />
                Admin
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Protecting Tshwane's Water Resources
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            An integrated platform monitoring water usage at car
            washes, supporting the informal economy while
            ensuring environmental compliance.
          </p>

          {/* Hero Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              onClick={() => onViewChange("report")}
            >
              <AlertTriangle className="h-5 w-5 mr-2" />
              Report an Issue
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3"
              onClick={() => {
                onRoleChange("citizen");
                onViewChange("register");
              }}
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Join Community
            </Button>
          </div>

          {/* Platform Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            <div className="bg-white rounded-lg shadow-sm p-6 border">
              <div className="flex items-center justify-between mb-2">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Droplets className="h-6 w-6 text-blue-600" />
                </div>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-blue-600 mb-1">
                247
              </h3>
              <p className="text-sm text-gray-600">
                Registered Car Washes
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border">
              <div className="flex items-center justify-between mb-2">
                <div className="bg-green-100 p-2 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-green-600 mb-1">
                1,247
              </h3>
              <p className="text-sm text-gray-600">
                Issues Resolved
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border">
              <div className="flex items-center justify-between mb-2">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-blue-600 mb-1">
                15.4M
              </h3>
              <p className="text-sm text-gray-600">
                Liters Water Saved
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border">
              <div className="flex items-center justify-between mb-2">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-green-600 mb-1">
                2,850
              </h3>
              <p className="text-sm text-gray-600">
                Active Citizens
              </p>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="flex flex-col items-center p-6">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Droplets className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Real-Time Monitoring
              </h3>
              <p className="text-gray-600 text-center">
                IoT sensors track water usage and detect
                anomalies in real-time across Tshwane
              </p>
            </div>

            <div className="flex flex-col items-center p-6">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Community Empowerment
              </h3>
              <p className="text-gray-600 text-center">
                Supporting informal car washes while building
                sustainable water practices
              </p>
            </div>

            <div className="flex flex-col items-center p-6">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Smart Compliance
              </h3>
              <p className="text-gray-600 text-center">
                Automated compliance tracking with incentives
                for green practices
              </p>
            </div>
          </div>

          {/* Network transparency link */}
          <div className="text-center mt-8">
            <Button
              variant="outline"
              size="lg"
              onClick={() => onViewChange("sensors")}
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              <BarChart3 className="h-5 w-5 mr-2" />
              View Water Network Status
            </Button>
          </div>
        </div>

        <Separator className="my-12" />

        {/* Citizen Reporting Form */}
        {currentView === "report" && (
          <div className="max-w-2xl mx-auto mb-16">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-blue-600">
                  Report Water Issues
                </CardTitle>
                <CardDescription>
                  Help us monitor water usage and waste
                  management in your area. Your reports help
                  protect our water resources.
                </CardDescription>
              </CardHeader>

              <CardContent>
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-green-600 mb-2">
                      Report Submitted Successfully
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Tracking ID: #WW
                      {Date.now().toString().slice(-6)}
                    </p>
                    <Badge
                      variant="secondary"
                      className="bg-green-50 text-green-700"
                    >
                      Your report has been received and will be
                      reviewed within 24 hours
                    </Badge>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <Label
                        htmlFor="location"
                        className="flex items-center space-x-2"
                      >
                        <MapPin className="h-4 w-4 text-blue-600" />
                        <span>Location</span>
                      </Label>
                      <Input
                        id="location"
                        placeholder="Enter address or use GPS location"
                        value={reportForm.location}
                        onChange={(e) =>
                          setReportForm({
                            ...reportForm,
                            location: e.target.value,
                          })
                        }
                        required
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="text-blue-600"
                      >
                        <MapPin className="h-4 w-4 mr-2" />
                        Use Current Location
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="issueType">
                        Issue Type
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          setReportForm({
                            ...reportForm,
                            issueType: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select the type of issue" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unauthorized-water">
                            Unauthorized Water Use
                          </SelectItem>
                          <SelectItem value="waste-dumping">
                            Illegal Waste Dumping
                          </SelectItem>
                          <SelectItem value="water-leak">
                            Water Leak/Pipe Burst
                          </SelectItem>
                          <SelectItem value="wastewater-discharge">
                            Improper Wastewater Discharge
                          </SelectItem>
                          <SelectItem value="unregistered-carwash">
                            Unregistered Car Wash
                          </SelectItem>
                          <SelectItem value="other">
                            Other
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Provide details about the issue you're reporting..."
                        value={reportForm.description}
                        onChange={(e) =>
                          setReportForm({
                            ...reportForm,
                            description: e.target.value,
                          })
                        }
                        rows={4}
                        required
                      />
                    </div>

                    <div className="space-y-4">
                      <Label className="flex items-center space-x-2">
                        <Camera className="h-4 w-4 text-gray-600" />
                        <span>Photo Evidence (Optional)</span>
                      </Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                        <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600">
                          Click to upload photos or drag and
                          drop
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          PNG, JPG up to 10MB
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          id="anonymous"
                          checked={reportForm.anonymous}
                          onChange={(e) =>
                            setReportForm({
                              ...reportForm,
                              anonymous: e.target.checked,
                            })
                          }
                          className="mt-1"
                        />
                        <div>
                          <Label
                            htmlFor="anonymous"
                            className="font-medium"
                          >
                            Submit Anonymously
                          </Label>
                          <p className="text-sm text-gray-600">
                            Your identity will not be shared.
                            You can still track your report with
                            the provided ID.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => onViewChange("landing")}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                        size="lg"
                      >
                        Submit Report
                      </Button>
                    </div>

                    <div className="text-center pt-4 border-t">
                      <p className="text-sm text-gray-600 mb-2">
                        Want to track this report?
                      </p>
                      <div className="flex justify-center space-x-2">
                        <Button
                          type="button"
                          variant="link"
                          size="sm"
                          onClick={() => {
                            onRoleChange("citizen");
                            onViewChange("login");
                          }}
                        >
                          Login
                        </Button>
                        <span className="text-gray-400">•</span>
                        <Button
                          type="button"
                          variant="link"
                          size="sm"
                          onClick={() => {
                            onRoleChange("citizen");
                            onViewChange("register");
                          }}
                        >
                          Register
                        </Button>
                      </div>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Platform Information Section */}
        {currentView === "landing" && (
          <>
            <div className="mt-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg shadow-lg text-white p-8">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-4">
                  How HydroHack Works
                </h3>
                <p className="text-xl opacity-90 max-w-3xl mx-auto">
                  Our integrated platform combines community
                  reporting, IoT monitoring, and government
                  oversight to create a comprehensive water
                  management system.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <FileText className="h-8 w-8" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">
                    1. Report Issues
                  </h4>
                  <p className="opacity-90">
                    Citizens report water wastage, illegal
                    dumping, and compliance violations through
                    our easy-to-use platform.
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <BarChart3 className="h-8 w-8" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">
                    2. Monitor & Track
                  </h4>
                  <p className="opacity-90">
                    IoT sensors provide real-time data while
                    government teams investigate and deploy
                    resources efficiently.
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">
                    3. Resolve & Improve
                  </h4>
                  <p className="opacity-90">
                    Issues are resolved through enforcement,
                    education, and support programs that benefit
                    the entire community.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-2 border-blue-100">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600 flex items-center space-x-2">
                    <Users className="h-6 w-6" />
                    <span>For Citizens</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">
                        24/7
                      </p>
                      <p className="text-sm text-gray-600">
                        Reporting Available
                      </p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">
                        92%
                      </p>
                      <p className="text-sm text-gray-600">
                        Response Rate
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Anonymous reporting option</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Real-time tracking with ID</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Photo evidence support</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>SMS/Email updates</span>
                    </li>
                  </ul>
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => {
                      onRoleChange("citizen");
                      onViewChange("register");
                    }}
                  >
                    Join as Citizen Reporter
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-100">
                <CardHeader>
                  <CardTitle className="text-xl text-green-600 flex items-center space-x-2">
                    <Droplets className="h-6 w-6" />
                    <span>For Car Wash Operators</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">
                        R25K
                      </p>
                      <p className="text-sm text-gray-600">
                        Max Subsidy
                      </p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">
                        78%
                      </p>
                      <p className="text-sm text-gray-600">
                        Compliance Rate
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>
                        Free registration & certification
                      </span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Water efficiency monitoring</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Green technology subsidies</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Business development support</span>
                    </li>
                  </ul>
                  <Button
                    variant="outline"
                    className="w-full border-green-600 text-green-600 hover:bg-green-50"
                    onClick={() => onRoleChange("operator")}
                  >
                    Register Your Business
                  </Button>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {/* Information Section */}
        <div className="mt-16 bg-white rounded-lg shadow-sm p-8">
          <h3 className="text-2xl font-bold text-center mb-8">
            Supporting Tshwane's Water Future
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-green-600 mb-4">
                For Car Wash Operators
              </h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  • Register your business for compliance
                  certification
                </li>
                <li>
                  • Access water efficiency tools and tips
                </li>
                <li>
                  • Qualify for green technology subsidies
                </li>
                <li>• Monitor your water usage and costs</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-blue-600 mb-4">
                Community Benefits
              </h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  • Reduced water wastage through monitoring
                </li>
                <li>• Improved wastewater management</li>
                <li>
                  • Support for informal economy formalization
                </li>
                <li>• Environmental protection initiatives</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p>&copy; 2025 HydroHack Solutions</p>
            <p className="text-gray-400 mt-2">
              Sustainable water management for all communities
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
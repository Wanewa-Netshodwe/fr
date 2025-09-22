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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Alert, AlertDescription } from "./ui/alert";
import { Shield, Lock, User, Droplets, AlertTriangle } from "lucide-react";
import { UserRole } from "../App";
import { useLocation, useNavigate } from "react-router";

interface LoginPageProps {
  onLogin: (role: UserRole) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const state = useLocation();
  const navigate = useNavigate();
  console.log("my state", state.state.role);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    otp: "",
    role: state.state.role,
  });
  const [step, setStep] = useState<"credentials" | "otp">("credentials");
  const [error, setError] = useState("");

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Demo validation
    if (!credentials.username || !credentials.password || !credentials.role) {
      setError("Please fill in all fields");
      return;
    }

    // For demo: admin requires OTP, operator logs in directly
    if (credentials.role === "admin") {
      setStep("otp");
    } else {
      navigate("/operator-portal");
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!credentials.otp) {
      setError("Please enter the OTP code");
      return;
    }

    // Demo OTP validation
    if (credentials.otp === "123456") {
      navigate("/admin-dashboard");
    } else {
      setError("Invalid OTP code");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-green-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="bg-white p-4 rounded-full inline-block mb-4 shadow-lg">
            <Droplets className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            HydroHack Solution
          </h1>
          <p className="text-blue-100">Secure Government Portal</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {step === "credentials" ? (
                <Shield className="h-8 w-8 text-blue-600" />
              ) : (
                <Lock className="h-8 w-8 text-green-600" />
              )}
            </div>
            <CardTitle className="text-xl">
              {step === "credentials"
                ? "Secure Login"
                : "Two-Factor Authentication"}
            </CardTitle>
            <CardDescription>
              {step === "credentials"
                ? "Access restricted to authorized government personnel"
                : "Enter the OTP code sent to your registered device"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {step === "credentials" ? (
              <form onSubmit={handleCredentialsSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Access Level</Label>
                  <Select
                    onValueChange={(value: "admin" | "operator") =>
                      setCredentials({
                        ...credentials,
                        role: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your access level" />
                    </SelectTrigger>
                    <SelectContent>
                      {state.state.role === "admin" ? (
                        <SelectItem value="admin">
                          <div className="flex items-center space-x-2">
                            <Shield className="h-4 w-4 text-red-500" />
                            <span>Government Admin (Confidential)</span>
                          </div>
                        </SelectItem>
                      ) : (
                        <SelectItem value="operator">
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-blue-500" />
                            <span>Car Wash Operator</span>
                          </div>
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username / Employee ID</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={credentials.username}
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        username: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        password: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                {credentials.role === "admin" && (
                  <Alert className="border-red-200 bg-red-50">
                    <Shield className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">
                      <strong>Confidential Access:</strong> This area contains
                      sensitive municipal data. Unauthorized access is
                      prohibited and monitored.
                    </AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {credentials.role === "admin" ? "Continue to 2FA" : "Sign In"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleOtpSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">6-Digit OTP Code</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="000000"
                    maxLength={6}
                    value={credentials.otp}
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        otp: e.target.value.replace(/\D/g, ""),
                      })
                    }
                    className="text-center text-lg tracking-widest"
                    required
                  />
                </div>

                <div className="text-center text-sm text-gray-600">
                  <p>
                    OTP sent to: ***-***-
                    {credentials.username.slice(-4) || "XXXX"}
                  </p>
                  <button
                    type="button"
                    className="text-blue-600 hover:underline mt-2"
                    onClick={() => alert("OTP resent (Demo: use 123456)")}
                  >
                    Resend OTP
                  </button>
                </div>

                <div className="flex space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setStep("credentials")}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    Verify & Login
                  </Button>
                </div>
              </form>
            )}

            {/* Demo Instructions */}
            <div className="mt-6 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Demo Access:</strong>
              </p>
              <p className="text-xs text-gray-500">
                • Username: demo | Password: password123
                <br />
                • Admin OTP: 123456
                <br />• Operator: Direct login after credentials
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="text-center mt-6">
          <p className="text-blue-100 text-sm">
            🔒 All sessions are encrypted and monitored
            <br />© 2025 HydroHack Solutions
          </p>
        </div>
      </div>
    </div>
  );
}

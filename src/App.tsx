import React, { useState } from "react";
import { PublicLanding } from "./components/PublicLanding";
import { AdminDashboard } from "./components/AdminDashboard";
import { OperatorPortal } from "./components/OperatorPortal";
import { LoginPage } from "./components/LoginPage";
import { CitizenAuth } from "./components/CitizenAuth";
import { CitizenDashboard } from "./components/CitizenDashboard";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

export type UserRole = "public" | "admin" | "operator" | "citizen" | null;
export type AuthView =
  | "landing"
  | "login"
  | "register"
  | "dashboard"
  | "report"
  | "sensors";

// A wrapper so we can read state from navigate("/login-citizen", { state: { role: "register" } })
function CitizenAuthWrapper({
  onViewChange,
  onLogin,
}: {
  onViewChange: (view: AuthView) => void;
  onLogin: (role: UserRole) => void;
}) {
  const location = useLocation();
  const roleFromState = location.state?.role ?? "login";

  return (
    <CitizenAuth
      currentView={roleFromState}
      onViewChange={onViewChange}
      onLogin={onLogin}
    />
  );
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserRole>("public");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<AuthView>("landing");
  const [citizenData, setCitizenData] = useState<any>(null);

  const handleViewChange = (view: AuthView) => {
    setCurrentView(view);
  };

  const handleLogin = (role: UserRole) => {
    setCurrentUser(role);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setCurrentUser("public");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

        <Route
          path="/login-citizen"
          element={
            <CitizenAuthWrapper
              onViewChange={handleViewChange}
              onLogin={handleLogin}
            />
          }
        />

        <Route
          path="/"
          element={
            <PublicLanding
              currentView={currentView}
              onViewChange={handleViewChange}
              onRoleChange={setCurrentUser}
            />
          }
        />

        <Route
          path="/admin-dashboard"
          element={<AdminDashboard onLogout={handleLogout} />}
        />

        <Route
          path="/operator-portal"
          element={<OperatorPortal onLogout={handleLogout} />}
        />
        <Route
          path="/citizen-dashboard"
          element={
            <CitizenDashboard
              citizenData={citizenData}
              onViewChange={handleViewChange}
              currentView={currentView}
              onLogout={handleLogout}
            />
          }
        />
      </Routes>
    </Router>
  );
}

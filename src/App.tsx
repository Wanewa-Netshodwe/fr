import React, { useState } from 'react';
import { PublicLanding } from './components/PublicLanding';
import { AdminDashboard } from './components/AdminDashboard';
import { OperatorPortal } from './components/OperatorPortal';
import { LoginPage } from './components/LoginPage';
import { CitizenAuth } from './components/CitizenAuth';
import { CitizenDashboard } from './components/CitizenDashboard';

export type UserRole = 'public' | 'admin' | 'operator' | 'citizen' | null;
export type AuthView = 'landing' | 'login' | 'register' | 'dashboard' | 'report' | 'sensors';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserRole>('public');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<AuthView>('landing');
  const [citizenData, setCitizenData] = useState<any>(null);

  const handleLogin = (role: UserRole, userData?: any) => {
    setCurrentUser(role);
    setIsAuthenticated(true);
    if (role === 'citizen' && userData) {
      setCitizenData(userData);
      setCurrentView('dashboard');
    }
  };

  const handleLogout = () => {
    setCurrentUser('public');
    setIsAuthenticated(false);
    setCitizenData(null);
    setCurrentView('landing');
  };

  const handleViewChange = (view: AuthView) => {
    setCurrentView(view);
  };

  // Show login page for admin/operator roles
  if ((currentUser === 'admin' || currentUser === 'operator') && !isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Handle citizen authentication flow
  if (currentUser === 'citizen') {
    if (!isAuthenticated) {
      return (
        <CitizenAuth 
          onLogin={handleLogin} 
          onViewChange={handleViewChange}
          currentView={currentView}
        />
      );
    } else {
      return (
        <CitizenDashboard 
          onLogout={handleLogout}
          onViewChange={handleViewChange}
          currentView={currentView}
          citizenData={citizenData}
        />
      );
    }
  }

  // Render appropriate interface based on user role
  switch (currentUser) {
    case 'admin':
      return <AdminDashboard onLogout={handleLogout} />;
    case 'operator':
      return <OperatorPortal onLogout={handleLogout} />;
    default:
      return (
        <PublicLanding 
          onRoleChange={setCurrentUser}
          onViewChange={handleViewChange}
          currentView={currentView}
        />
      );
  }
}
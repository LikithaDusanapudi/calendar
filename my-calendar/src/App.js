import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import CompanyManagement from './components/CompanyManagement';
import CommunicationMethodManagement from './components/CommunicationMethodManagement';

function App() {
  return (
    <Router>
      <Routes>
        {/* Authentication routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Admin dashboard and management routes */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/companies" element={<CompanyManagement />} />
        <Route path="/admin/communication-methods" element={<CommunicationMethodManagement />} />

        {/* User dashboard route */}
        <Route path="/user-dashboard" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Layout from './components/Layout/Layout';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Employees from './pages/Employees/Employees';
import Attendance from './pages/Attendance/Attendance';
import Leave from './pages/Leave/Leave';
import Payroll from './pages/Payroll/Payroll';
import Calendar from './pages/Calendar/Calendar';
import Settings from './pages/Settings/Settings';

// Wrapper to handle root redirect
const RootRedirect = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;

  return isAuthenticated
    ? <Navigate to="/dashboard" replace />
    : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes with Layout */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout><Dashboard /></Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/employees"
            element={
              <ProtectedRoute>
                <Layout><Employees /></Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/attendance"
            element={
              <ProtectedRoute>
                <Layout><Attendance /></Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/leave"
            element={
              <ProtectedRoute>
                <Layout><Leave /></Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/payroll"
            element={
              <ProtectedRoute>
                <Layout><Payroll /></Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/calendar"
            element={
              <ProtectedRoute>
                <Layout><Calendar /></Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Layout><Settings /></Layout>
              </ProtectedRoute>
            }
          />

          {/* Root redirect */}
          <Route path="/" element={<RootRedirect />} />

          {/* Catch all — redirect to root */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;

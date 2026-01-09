import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/Login.jsx";
import RegisterPage from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AddJob from "./pages/AddJob.jsx";
import EditJob from "./pages/EditJob.jsx";
import StatusOverview from "./pages/StatusOverview.jsx";

function AppWrapper() {
  const token = localStorage.getItem("token");
  const location = useLocation();

  return (
    <>
      {/* Only show navbar if token exists */}
      {token && location.pathname !== "/login" && <Navbar />}

      <Routes>
        <Route
          path="/login"
          element={!token ? <LoginPage /> : <Navigate to="/status-overview" replace />}
        />
        <Route
          path="/register"
          element={!token ? <RegisterPage /> : <Navigate to="/dashboard" replace />}
        />
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/add-job"
          element={token ? <AddJob /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/edit-job/:id"
          element={token ? <EditJob /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/status-overview"
          element={token ? <StatusOverview /> : <Navigate to="/login" replace />}
        />
        <Route
          path="*"
          element={<Navigate to={token ? "/dashboard" : "/login"} replace />}
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";

import RoleProtectedRoute from "./routes/RoleProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ADMIN ONLY */}
        <Route
          path="/admin"
          element={
            <RoleProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </RoleProtectedRoute>
          }
        />

        {/* USER ONLY */}
        <Route
          path="/user"
          element={
            <RoleProtectedRoute allowedRoles={["USER"]}>
              <UserDashboard />
            </RoleProtectedRoute>
          }
        />

        {/* STORE OWNER ONLY */}
        <Route
          path="/owner"
          element={
            <RoleProtectedRoute allowedRoles={["STORE_OWNER"]}>
              <OwnerDashboard />
            </RoleProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
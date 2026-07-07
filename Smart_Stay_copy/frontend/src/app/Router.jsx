import { Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "../components/common/ProtectedRoute";
import RoleRoute from "../components/common/RoleRoute";
import DashboardLayout from "../components/layout/DashboardLayout";


import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import ForgotPassword from "../features/auth/pages/ForgotPassword";
import ResetPassword from "../features/auth/pages/ResetPassword";


import DashboardHome from "../features/dashboard/pages/DashboardHome";


import Properties from "../features/property/pages/Properties";
import CreateProperty from "../features/property/pages/CreateProperty";
import EditProperty from "../features/property/pages/EditProperty";
import PropertyDetails from "../features/property/pages/PropertyDetails";


import Room from "../features/room/pages/Room";
import CreateRoom from "../features/room/pages/CreateRoom";
import EditRoom from "../features/room/pages/EditRoom";


import Bookings from "../features/booking/pages/Bookings";
import CreateBooking from "../features/booking/pages/CreateBooking";


import Payments from "../features/payment/pages/Payments";


import Complaints from "../features/complaint/pages/Complaints";


import Maintenance from "../features/maintenance/pages/Maintenance";


import Analytics from "../features/analytics/pages/Analytics";


import Profile from "../features/profile/pages/Profile";

const Router = () => {
  return (
    <Routes>
      {}
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      {}
      <Route path="/login" element={<Login />} />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route
        path="/reset-password/:token"
        element={<ResetPassword />}
      />

      {}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />

        {}
        <Route
          path="properties"
          element={<Properties />}
        />

        <Route
          path="properties/create"
          element={
            <RoleRoute allowedRoles={["owner", "admin"]}>
              <CreateProperty />
            </RoleRoute>
          }
        />

        <Route
          path="properties/:id"
          element={<PropertyDetails />}
        />

        <Route
          path="properties/:id/edit"
          element={
            <RoleRoute allowedRoles={["owner", "admin"]}>
              <EditProperty />
            </RoleRoute>
          }
        />

        {}
        <Route path="rooms" element={<Room />} />
        <Route
          path="properties/:propertyId/rooms"
          element={<Room />}
        />

        <Route
          path="properties/:propertyId/rooms/create"
          element={
            <RoleRoute allowedRoles={["owner", "admin"]}>
              <CreateRoom />
            </RoleRoute>
          }
        />

        <Route
          path="rooms/:roomId/edit"
          element={
            <RoleRoute allowedRoles={["owner", "admin"]}>
              <EditRoom />
            </RoleRoute>
          }
        />

        {}
        <Route
          path="bookings"
          element={<Bookings />}
        />

        <Route
          path="properties/:propertyId/bookings"
          element={
            <RoleRoute allowedRoles={["owner", "admin"]}>
              <Bookings />
            </RoleRoute>
          }
        />

        <Route
          path="properties/:propertyId/rooms/:roomId/book"
          element={
            <RoleRoute allowedRoles={["tenant"]}>
              <CreateBooking />
            </RoleRoute>
          }
        />

        {}
        <Route
          path="complaints"
          element={<Complaints />}
        />

        {}
        <Route
          path="payments"
          element={<Payments />}
        />

        {}
        <Route
          path="maintenance"
          element={<Maintenance />}
        />

        {}
        <Route
          path="analytics"
          element={<Analytics />}
        />

        {}
        <Route
          path="profile"
          element={<Profile />}
        />
      </Route>

      {}
      <Route
        path="*"
        element={
          <div className="flex min-h-screen items-center justify-center">
            <h1 className="text-3xl font-bold">
              404 | Page Not Found
            </h1>
          </div>
        }
      />
    </Routes>
  );
};

export default Router;
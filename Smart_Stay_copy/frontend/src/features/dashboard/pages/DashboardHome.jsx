import { useSelector } from "react-redux";
import AdminDashboard from "./AdminDashboard";
import OwnerDashboard from "./OwnerDashboard";
import TenantDashboard from "./TenantDashboard";

const DashboardHome = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const role = currentUser?.role;

  if (role === "admin") {
    return <AdminDashboard />;
  }

  if (role === "owner") {
    return <OwnerDashboard />;
  }

  if (role === "tenant") {
    return <TenantDashboard />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <h2 className="text-xl font-semibold text-slate-600">Loading Dashboard...</h2>
    </div>
  );
};

export default DashboardHome;
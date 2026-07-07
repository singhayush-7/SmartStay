import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { useAuth } from "../../features/auth/hooks/useAuth";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = useSelector((state) => state.auth);

  const { logoutHandler } = useAuth();

  const role = user?.role;

  const menuItems = {
    admin: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Properties", path: "/dashboard/properties" },
      { name: "Bookings", path: "/dashboard/bookings" },
      { name: "Payments", path: "/dashboard/payments" },
      { name: "Complaints", path: "/dashboard/complaints" },
      { name: "Maintenance", path: "/dashboard/maintenance" },
      { name: "Analytics", path: "/dashboard/analytics" },
      { name: "Users", path: "/dashboard/users" },
    ],

    owner: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Properties", path: "/dashboard/properties" },
      { name: "Bookings", path: "/dashboard/bookings" },
      { name: "Payments", path: "/dashboard/payments" },
      { name: "Complaints", path: "/dashboard/complaints" },
      { name: "Maintenance", path: "/dashboard/maintenance" },
      { name: "Analytics", path: "/dashboard/analytics" },
    ],

    tenant: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "My Bookings", path: "/dashboard/bookings" },
      { name: "Payments", path: "/dashboard/payments" },
      { name: "Complaints", path: "/dashboard/complaints" },
      { name: "Profile", path: "/dashboard/profile" },
    ],
  };

  return (
    <>
      {}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed
          top-0
          left-0
          z-40
          h-screen
          w-64
          bg-white
          border-r
          border-slate-200
          shadow-lg
          transition-transform
          duration-300
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        <div className="h-16 flex items-center justify-center border-b">
          <h1 className="text-2xl font-bold text-indigo-600">
            SmartStay
          </h1>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems[role]?.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `block rounded-lg px-4 py-3 transition
                ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-5 left-0 w-full px-4">
          <button
            onClick={logoutHandler}
            className="w-full rounded-lg bg-red-500 py-3 text-white hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
import { useState } from "react";
import { Menu, X, ChevronDown, LogOut } from "lucide-react";
import { useSelector } from "react-redux";

import { useAuth } from "../../features/auth/hooks/useAuth";

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const { logoutHandler } = useAuth();

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm">
      {}
      <div className="flex items-center gap-4">
        <button
          className="rounded-lg p-2 hover:bg-slate-100"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <h2 className="text-xl font-semibold text-slate-800">
          Dashboard
        </h2>
      </div>

      {}
      <div className="relative flex items-center gap-4">
        {}
        <span className="hidden rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium capitalize text-indigo-700 sm:block">
          {user?.role}
        </span>

        {}
        <button
          onClick={() => setShowDropdown((prev) => !prev)}
          className="flex items-center gap-3 rounded-lg px-2 py-1 transition hover:bg-slate-100"
        >
          {}
          {user?.avatar?.secure_url ? (
            <img
              src={user.avatar.secure_url}
              alt={user.name}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
              {initials}
            </div>
          )}

          <div className="hidden text-left md:block">
            <p className="font-medium text-slate-800">
              {user?.name}
            </p>

            <p className="text-sm text-slate-500">
              {user?.email}
            </p>
          </div>

          <ChevronDown size={18} />
        </button>

        {}
        {showDropdown && (
          <div className="absolute right-0 top-14 w-56 rounded-xl border border-slate-200 bg-white py-2 shadow-xl">
            <button
              className="flex w-full items-center gap-2 px-4 py-3 text-left hover:bg-slate-100"
              onClick={logoutHandler}
            >
              <LogOut size={18} />

              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
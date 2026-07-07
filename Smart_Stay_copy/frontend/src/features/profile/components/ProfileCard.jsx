import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  Shield,
  Calendar,
  MapPin,
  Pencil,
} from "lucide-react";

const roleColors = {
  admin: "bg-red-100 text-red-700",
  owner: "bg-blue-100 text-blue-700",
  tenant: "bg-green-100 text-green-700",
};

const ProfileCard = ({ user, onDelete }) => {
  if (!user) return null;

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

      {}

      <div className="h-28 bg-gradient-to-r from-indigo-600 to-purple-600" />

      {}

      <div className="px-6 pb-6">

        {}

        <div className="-mt-14 flex justify-center">
          <img
            src={
              user.avatar?.secure_url ||
              "https://placehold.co/160x160?text=User"
            }
            alt={user.name}
            className="h-28 w-28 rounded-full border-4 border-white object-cover"
          />
        </div>

        {}

        <div className="mt-4 text-center">
          <h2 className="text-2xl font-bold">
            {user.name}
          </h2>

          <span
            className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-medium capitalize ${
              roleColors[user.role] ||
              "bg-gray-100 text-gray-700"
            }`}
          >
            {user.role}
          </span>
        </div>

        {}

        <div className="mt-8 space-y-4">

          <div className="flex items-center gap-3">
            <Mail size={18} />
            <span>{user.email}</span>
          </div>

          {user.phone && (
            <div className="flex items-center gap-3">
              <Phone size={18} />
              <span>{user.phone}</span>
            </div>
          )}

          {user.address && (
            <div className="flex items-center gap-3">
              <MapPin size={18} />
              <span>{user.address}</span>
            </div>
          )}

          <div className="flex items-center gap-3">
            <Shield size={18} />
            <span className="capitalize">
              {user.role}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Calendar size={18} />
            <span>
              Joined{" "}
              {new Date(
                user.createdAt
              ).toLocaleDateString()}
            </span>
          </div>
        </div>

        {}

        <button
          onClick={onDelete}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 py-3 font-medium text-white transition hover:bg-red-700"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
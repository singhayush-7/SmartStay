import { Link } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";

const PropertyTable = ({ properties = [], onDelete }) => {
  if (!properties.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 py-20 text-center">
        <p className="text-slate-500">No properties found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">City</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Rooms</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Type</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Actions</th>
          </tr>
        </thead>

        <tbody>
          {properties.map((property) => (
            <tr key={property._id} className="border-t border-slate-100 hover:bg-slate-50 transition">
              <td className="px-6 py-4 text-sm font-medium text-slate-800">
                {property.name}
              </td>
              <td className="px-6 py-4 text-sm text-slate-600">
                {property.city}, {property.state}
              </td>
              <td className="px-6 py-4 text-sm text-slate-600">
                {property.totalRooms}
              </td>
              <td className="px-6 py-4 text-sm text-slate-600 capitalize">
                {property.gender}
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <Link
                    to={`/dashboard/properties/${property._id}/edit`}
                    className="rounded-lg bg-yellow-500 p-2 text-white hover:bg-yellow-600"
                  >
                    <Edit size={16} />
                  </Link>
                  <button
                    onClick={() => onDelete?.(property._id)}
                    className="rounded-lg bg-red-500 p-2 text-white hover:bg-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropertyTable;

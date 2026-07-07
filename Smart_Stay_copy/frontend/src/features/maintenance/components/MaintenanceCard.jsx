import { format } from "date-fns";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  assigned: "bg-blue-100 text-blue-700",
  "in-progress": "bg-indigo-100 text-indigo-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const priorityColors = {
  low: "bg-gray-100 text-gray-700",
  medium: "bg-orange-100 text-orange-700",
  high: "bg-red-100 text-red-700",
  urgent: "bg-purple-100 text-purple-700",
};

const MaintenanceCard = ({
  maintenance,
  role,
  onAssign,
  onStatusChange,
  onComplete,
  onDelete,
}) => {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      {}

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {maintenance.title}
        </h2>

        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            statusColors[maintenance.status] ||
            "bg-slate-100 text-slate-700"
          }`}
        >
          {maintenance.status?.charAt(0).toUpperCase() + maintenance.status?.slice(1)}
        </span>
      </div>

      {}

      <div className="mt-3 flex gap-3 flex-wrap">
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${
            priorityColors[maintenance.priority]
          }`}
        >
          {maintenance.priority?.charAt(0).toUpperCase() + maintenance.priority?.slice(1)}
        </span>
      </div>

      {}

      <p className="mt-4 text-slate-600">
        {maintenance.description}
      </p>

      {}

      <div className="mt-5 space-y-2 text-sm text-slate-500">
        <p>
          <strong>Property:</strong>{" "}
          {maintenance.property?.name}
        </p>

        <p>
          <strong>Room:</strong>{" "}
          {maintenance.room?.roomNumber}
        </p>

        <p>
          <strong>Assigned To:</strong>{" "}
          {maintenance.assignedTo || "Not Assigned"}
        </p>

        <p>
          <strong>Estimated Cost:</strong> ₹
          {maintenance.estimatedCost || 0}
        </p>

        <p>
          <strong>Created:</strong>{" "}
          {format(
            new Date(maintenance.createdAt),
            "dd MMM yyyy"
          )}
        </p>

        {maintenance.completedAt && (
          <p>
            <strong>Completed:</strong>{" "}
            {format(
              new Date(maintenance.completedAt),
              "dd MMM yyyy"
            )}
          </p>
        )}
      </div>

      {}

      {(role === "owner" || role === "admin") && (
        <div className="mt-6 flex flex-wrap gap-3">

          <button
            onClick={() => onAssign(maintenance)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Assign
          </button>

          <button
            onClick={() =>
              onStatusChange(
                maintenance._id,
                "in-progress"
              )
            }
            className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            In Progress
          </button>

          <button
            onClick={() =>
              onComplete(maintenance._id)
            }
            className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            Complete
          </button>

          {role === "admin" && (
            <button
              onClick={() =>
                onDelete(maintenance._id)
              }
              className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MaintenanceCard;
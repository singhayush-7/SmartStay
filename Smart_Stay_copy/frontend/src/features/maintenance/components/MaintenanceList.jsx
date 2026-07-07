import MaintenanceCard from "./MaintenanceCard";

const MaintenanceList = ({
  maintenances = [],
  role,
  onAssign,
  onStatusChange,
  onComplete,
  onDelete,
}) => {
  if (!maintenances.length) {
    return (
      <div className="rounded-xl bg-white p-10 text-center shadow">
        <h2 className="text-xl font-semibold text-slate-700">
          No Maintenance Tasks Found
        </h2>

        <p className="mt-2 text-slate-500">
          There are no maintenance tasks available.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {maintenances.map((maintenance) => (
        <MaintenanceCard
          key={maintenance._id}
          maintenance={maintenance}
          role={role}
          onAssign={onAssign}
          onStatusChange={onStatusChange}
          onComplete={onComplete}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default MaintenanceList;
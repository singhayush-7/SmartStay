import { useEffect } from "react";
import { useSelector } from "react-redux";

import MaintenanceList from "../components/MaintenanceList";
import { useMaintenance } from "../hooks/useMaintenance";

const Maintenance = () => {
  const { user } = useSelector((state) => state.auth);

  const {
    maintenances,
    loading,
    fetchMyMaintenance,
    assignMaintenance,
    updateStatus,
    completeMaintenance,
    deleteMaintenance,
  } = useMaintenance();

  useEffect(() => {
    fetchMyMaintenance();
  }, []);

  const handleAssign = (maintenance) => {
    const assignedTo = prompt(
      "Enter technician/vendor name:"
    );

    if (!assignedTo) return;

    assignMaintenance(maintenance._id, {
      assignedTo,
    });
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-lg font-medium text-slate-600">
          Loading maintenance tasks...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {}

      <div>
        <h1 className="text-3xl font-bold">
          Maintenance
        </h1>

        <p className="mt-2 text-slate-500">
          Manage maintenance requests and
          monitor their progress.
        </p>
      </div>

      {}

      <MaintenanceList
        maintenances={maintenances}
        role={user?.role}
        onAssign={handleAssign}
        onStatusChange={updateStatus}
        onComplete={completeMaintenance}
        onDelete={deleteMaintenance}
      />
    </div>
  );
};

export default Maintenance;
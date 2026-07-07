import api from "../../../api/axios";



export const createMaintenance = async (maintenanceData) => {
  const { data } = await api.post(
    "/maintenance",
    maintenanceData
  );

  return data;
};



export const getMyMaintenance = async () => {
  const { data } = await api.get(
    "/maintenance/my-maintenance"
  );

  return data;
};



export const getMaintenanceById = async (
  maintenanceId
) => {
  const { data } = await api.get(
    `/maintenance/${maintenanceId}`
  );

  return data;
};



export const assignMaintenance = async (
  maintenanceId,
  assignData
) => {
  const { data } = await api.put(
    `/maintenance/${maintenanceId}/assign`,
    assignData
  );

  return data;
};



export const updateMaintenanceStatus = async (
  maintenanceId,
  status
) => {
  const { data } = await api.put(
    `/maintenance/${maintenanceId}/status`,
    {
      status,
    }
  );

  return data;
};



export const completeMaintenance = async (
  maintenanceId
) => {
  const { data } = await api.put(
    `/maintenance/${maintenanceId}/complete`
  );

  return data;
};



export const deleteMaintenance = async (
  maintenanceId
) => {
  const { data } = await api.delete(
    `/maintenance/${maintenanceId}`
  );

  return data;
};
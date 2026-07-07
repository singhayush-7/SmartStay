import api from "../../../api/axios";

export const getOwnerDashboard = async () => {
  const response = await api.get("/dashboard/owner");
  return response.data;
};

export const getTenantDashboard = async () => {
  const response = await api.get("/dashboard/tenant");
  return response.data;
};

export const getAdminDashboard = async () => {
  const response = await api.get("/dashboard/admin");
  return response.data;
};

import api from "../../../api/axios";


export const getRevenue = async () => {
  const { data } = await api.get("/analytics/revenue");

  return data;
};



export const getOccupancy = async () => {
  const { data } = await api.get("/analytics/occupancy");

  return data;
};



export const getBookings = async () => {
  const { data } = await api.get("/analytics/bookings");

  return data;
};



export const getPayments = async () => {
  const { data } = await api.get("/analytics/payments");

  return data;
};



export const getComplaints = async () => {
  const { data } = await api.get("/analytics/complaints");

  return data;
};



export const getMaintenance = async () => {
  const { data } = await api.get("/analytics/maintenance");

  return data;
};
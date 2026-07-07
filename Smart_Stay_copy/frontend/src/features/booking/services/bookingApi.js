import api from "../../../api/axios";





export const createBooking = async (bookingData) => {
  const response = await api.post(
    "/bookings",
    bookingData
  );

  return response.data;
};





export const getMyBookings = async () => {
  const response = await api.get(
    "/bookings/my-bookings"
  );

  return response.data;
};





export const getPropertyBookings = async (propertyId) => {
  const response = await api.get(
    `/bookings/property/${propertyId}`
  );

  return response.data;
};





export const cancelBooking = async (bookingId) => {
  const response = await api.put(
    `/bookings/${bookingId}/cancel`
  );

  return response.data;
};





export const approveBooking = async (bookingId) => {
  const response = await api.put(
    `/bookings/${bookingId}/approve`
  );

  return response.data;
};





export const rejectBooking = async (bookingId) => {
  const response = await api.put(
    `/bookings/${bookingId}/reject`
  );

  return response.data;
};





export const deleteBooking = async (bookingId) => {
  const response = await api.delete(
    `/bookings/${bookingId}`
  );

  return response.data;
};
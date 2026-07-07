import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  setLoading,
  setError,
  clearError,
  setBookings,
  setSelectedBooking,
  addBooking,
  updateBooking,
  removeBooking,
} from "../bookingSlice";

import {
  createBooking,
  getMyBookings,
  getPropertyBookings,
  approveBooking,
  rejectBooking,
  cancelBooking,
  deleteBooking,
} from "../services/bookingApi";

export const useBooking = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  
  

  const createNewBooking = async (data) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());

      const response = await createBooking(data);

      dispatch(addBooking(response.data));

      toast.success(response.message);

      navigate("/dashboard/bookings");

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to create booking";

      dispatch(setError(message));
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  
  
  

  const fetchMyBookings = async () => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());

      const response = await getMyBookings();

      dispatch(setBookings(response.data));

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to fetch bookings";

      dispatch(setError(message));
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  
  
  

  const fetchPropertyBookings = async (propertyId) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());

      const response =
        await getPropertyBookings(propertyId);

      dispatch(setBookings(response.data));

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to fetch property bookings";

      dispatch(setError(message));
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  
  
  

  const approve = async (bookingId) => {
    try {
      dispatch(setLoading(true));

      const response =
        await approveBooking(bookingId);

      dispatch(updateBooking(response.data));

      toast.success("Booking approved");

      return response.data;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to approve booking"
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  
  
  

  const reject = async (bookingId) => {
    try {
      dispatch(setLoading(true));

      const response =
        await rejectBooking(bookingId);

      dispatch(updateBooking(response.data));

      toast.success("Booking rejected");

      return response.data;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to reject booking"
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  
  
  

  const cancel = async (bookingId) => {
    try {
      dispatch(setLoading(true));

      const response =
        await cancelBooking(bookingId);

      dispatch(updateBooking(response.data));

      toast.success("Booking cancelled");

      return response.data;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to cancel booking"
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  
  
  

  const removeBookingById = async (bookingId) => {
    try {
      dispatch(setLoading(true));

      await deleteBooking(bookingId);

      dispatch(removeBooking(bookingId));

      toast.success("Booking deleted");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete booking"
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    createNewBooking,
    fetchMyBookings,
    fetchPropertyBookings,
    approve,
    reject,
    cancel,
    removeBookingById,
  };
};
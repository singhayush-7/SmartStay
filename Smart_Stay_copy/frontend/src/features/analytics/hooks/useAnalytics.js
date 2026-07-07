import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import {
  setLoading,
  setError,
  clearError,
  setRevenue,
  setOccupancy,
  setBookings,
  setPayments,
  setComplaints,
  setMaintenance,
} from "../analyticsSlice";

import {
  getRevenue,
  getOccupancy,
  getBookings,
  getPayments,
  getComplaints,
  getMaintenance,
} from "../services/analyticsApi";

export const useAnalytics = () => {
  const dispatch = useDispatch();

  const analyticsState = useSelector(
    (state) => state.analytics
  );

  

  const fetchRevenue = async () => {
    try {
      const res = await getRevenue();

      dispatch(setRevenue(res.data));
    } catch (error) {
      throw error;
    }
  };

  

  const fetchOccupancy = async () => {
    try {
      const res = await getOccupancy();

      dispatch(setOccupancy(res.data));
    } catch (error) {
      throw error;
    }
  };

  

  const fetchBookings = async () => {
    try {
      const res = await getBookings();

      dispatch(setBookings(res.data));
    } catch (error) {
      throw error;
    }
  };

  

  const fetchPayments = async () => {
    try {
      const res = await getPayments();

      dispatch(setPayments(res.data));
    } catch (error) {
      throw error;
    }
  };

  

  const fetchComplaints = async () => {
    try {
      const res = await getComplaints();

      dispatch(setComplaints(res.data));
    } catch (error) {
      throw error;
    }
  };

  

  const fetchMaintenance = async () => {
    try {
      const res = await getMaintenance();

      dispatch(setMaintenance(res.data));
    } catch (error) {
      throw error;
    }
  };

  

  const fetchAllAnalytics = async () => {
    dispatch(setLoading(true));

    try {
      await Promise.all([
        fetchRevenue(),
        fetchOccupancy(),
        fetchBookings(),
        fetchPayments(),
        fetchComplaints(),
        fetchMaintenance(),
      ]);

      dispatch(clearError());
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to fetch analytics.";

      dispatch(setError(message));
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    ...analyticsState,

    fetchRevenue,
    fetchOccupancy,
    fetchBookings,
    fetchPayments,
    fetchComplaints,
    fetchMaintenance,
    fetchAllAnalytics,
  };
};
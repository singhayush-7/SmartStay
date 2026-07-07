import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import {
  setLoading,
  setError,
  clearError,
  setComplaints,
  setComplaint,
  addComplaint,
  updateComplaint as updateComplaintState,
  removeComplaint,
} from "../complaintSlice";

import * as complaintApi from "../services/complaintApi";

export const useComplaint = () => {
  const dispatch = useDispatch();

  const complaintState = useSelector(
    (state) => state.complaint
  );

  

  const createComplaint = async (formData) => {
    try {
      dispatch(setLoading(true));

      const response =
        await complaintApi.createComplaint(formData);

      dispatch(addComplaint(response.data));

      toast.success(response.message);

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to create complaint.";

      dispatch(setError(message));

      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  

  const fetchMyComplaints = async () => {
    try {
      dispatch(setLoading(true));

      const response =
        await complaintApi.getMyComplaints();

      dispatch(setComplaints(response.data));
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to fetch complaints.";

      dispatch(setError(message));

      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  

  const fetchPropertyComplaints = async (
    propertyId
  ) => {
    try {
      dispatch(setLoading(true));

      const response =
        await complaintApi.getPropertyComplaints(
          propertyId
        );

      dispatch(setComplaints(response.data));
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to fetch complaints.";

      dispatch(setError(message));

      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  

  const fetchComplaintById = async (
    complaintId
  ) => {
    try {
      dispatch(setLoading(true));

      const response =
        await complaintApi.getComplaintById(
          complaintId
        );

      dispatch(setComplaint(response.data));
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to fetch complaint.";

      dispatch(setError(message));

      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  

  const updateComplaint = async (
    complaintId,
    formData
  ) => {
    try {
      dispatch(setLoading(true));

      const response =
        await complaintApi.updateComplaint(
          complaintId,
          formData
        );

      dispatch(updateComplaintState(response.data));

      toast.success(response.message);

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to update complaint.";

      dispatch(setError(message));

      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  

  const updateComplaintStatus = async (
    complaintId,
    status,
    ownerRemarks = ""
  ) => {
    try {
      dispatch(setLoading(true));

      const response =
        await complaintApi.updateComplaintStatus(
          complaintId,
          status,
          ownerRemarks
        );

      dispatch(updateComplaintState(response.data));

      toast.success(response.message);

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to update complaint.";

      dispatch(setError(message));

      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  /*
  =========================================
  Delete Complaint
  =========================================
  */

  const deleteComplaint = async (
    complaintId
  ) => {
    try {
      dispatch(setLoading(true));

      const response =
        await complaintApi.deleteComplaint(
          complaintId
        );

      dispatch(removeComplaint(complaintId));

      toast.success(response.message);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to delete complaint.";

      dispatch(setError(message));

      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    ...complaintState,

    createComplaint,
    fetchMyComplaints,
    fetchPropertyComplaints,
    fetchComplaintById,
    updateComplaint,
    updateComplaintStatus,
    deleteComplaint,

    clearError: () => dispatch(clearError()),
  };
};
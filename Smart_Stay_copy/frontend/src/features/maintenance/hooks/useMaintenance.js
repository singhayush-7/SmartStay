import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import {
  setLoading,
  setError,
  clearError,
  setMaintenances,
  setMaintenance,
  addMaintenance,
  updateMaintenance,
  removeMaintenance,
} from "../maintenanceSlice";

import {
  createMaintenance as createMaintenanceApi,
  getMyMaintenance as getMyMaintenanceApi,
  getMaintenanceById as getMaintenanceByIdApi,
  assignMaintenance as assignMaintenanceApi,
  updateMaintenanceStatus as updateMaintenanceStatusApi,
  completeMaintenance as completeMaintenanceApi,
  deleteMaintenance as deleteMaintenanceApi,
} from "../services/maintenanceApi";

export const useMaintenance = () => {
  const dispatch = useDispatch();

  const maintenanceState = useSelector(
    (state) => state.maintenance
  );

  

  const fetchMyMaintenance = async () => {
    dispatch(setLoading(true));

    try {
      const res = await getMyMaintenanceApi();

      dispatch(setMaintenances(res.data));
      dispatch(clearError());
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message ||
            "Failed to fetch maintenance tasks."
        )
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to fetch maintenance tasks."
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  

  const fetchMaintenanceById = async (id) => {
    dispatch(setLoading(true));

    try {
      const res = await getMaintenanceByIdApi(id);

      dispatch(setMaintenance(res.data));
      dispatch(clearError());
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message ||
            "Failed to fetch maintenance."
        )
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to fetch maintenance."
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  

  const createMaintenance = async (
    maintenanceData
  ) => {
    dispatch(setLoading(true));

    try {
      const res = await createMaintenanceApi(
        maintenanceData
      );

      dispatch(addMaintenance(res.data));

      toast.success(
        "Maintenance task created successfully."
      );

      return true;
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message ||
            "Failed to create maintenance."
        )
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to create maintenance."
      );

      return false;
    } finally {
      dispatch(setLoading(false));
    }
  };

  

  const assignMaintenance = async (
    id,
    assignData
  ) => {
    dispatch(setLoading(true));

    try {
      const res = await assignMaintenanceApi(
        id,
        assignData
      );

      dispatch(updateMaintenance(res.data));

      toast.success(
        "Technician assigned successfully."
      );
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message ||
            "Assignment failed."
        )
      );

      toast.error(
        error.response?.data?.message ||
          "Assignment failed."
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  

  const updateStatus = async (
    id,
    status
  ) => {
    dispatch(setLoading(true));

    try {
      const res =
        await updateMaintenanceStatusApi(
          id,
          status
        );

      dispatch(updateMaintenance(res.data));

      toast.success(
        "Maintenance updated successfully."
      );
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message ||
            "Status update failed."
        )
      );

      toast.error(
        error.response?.data?.message ||
          "Status update failed."
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  

  const completeMaintenance = async (id) => {
    dispatch(setLoading(true));

    try {
      const res =
        await completeMaintenanceApi(id);

      dispatch(updateMaintenance(res.data));

      toast.success(
        "Maintenance completed successfully."
      );
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message ||
            "Completion failed."
        )
      );

      toast.error(
        error.response?.data?.message ||
          "Completion failed."
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  

  const deleteMaintenance = async (id) => {
    dispatch(setLoading(true));

    try {
      await deleteMaintenanceApi(id);

      dispatch(removeMaintenance(id));

      toast.success(
        "Maintenance deleted successfully."
      );
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message ||
            "Delete failed."
        )
      );

      toast.error(
        error.response?.data?.message ||
          "Delete failed."
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    ...maintenanceState,

    fetchMyMaintenance,
    fetchMaintenanceById,
    createMaintenance,
    assignMaintenance,
    updateStatus,
    completeMaintenance,
    deleteMaintenance,
  };
};
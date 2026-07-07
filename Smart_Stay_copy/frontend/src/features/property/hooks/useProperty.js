import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getAllProperties,
  getMyProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
} from "../services/propertyApi";

import {
  setLoading,
  setError,
  clearError,
  setProperties,
  setSelectedProperty,
  addProperty,
  updateProperty as updatePropertyState,
  removeProperty,
} from "../propertySlice";

export const useProperty = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  
  
  const fetchProperties = async (params = {}) => {
    dispatch(setLoading(true));

    try {
      const response = await getAllProperties(params);

      dispatch(setProperties(response.data));
      dispatch(clearError());
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to fetch properties.";

      dispatch(setError(message));
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  
  
  
  const fetchMyProperties = async () => {
    dispatch(setLoading(true));

    try {
      const response = await getMyProperties();

      dispatch(setProperties(response.data));
      dispatch(clearError());
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to fetch your properties.";

      dispatch(setError(message));
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  
  
  
  const fetchPropertyById = async (propertyId) => {
    dispatch(setLoading(true));

    try {
      const response = await getPropertyById(propertyId);

      dispatch(setSelectedProperty(response.data));
      dispatch(clearError());
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Property not found.";

      dispatch(setError(message));
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  
  
  
  const createNewProperty = async (propertyData) => {
    dispatch(setLoading(true));

    try {
      const response = await createProperty(propertyData);

      dispatch(addProperty(response.data));

      toast.success(response.message);

      navigate("/dashboard/properties");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to create property.";

      dispatch(setError(message));
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  
  
  
  const editProperty = async (propertyId, propertyData) => {
    dispatch(setLoading(true));

    try {
      const response = await updateProperty(
        propertyId,
        propertyData
      );

      dispatch(updatePropertyState(response.data));

      toast.success(response.message);

      navigate("/dashboard/properties");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to update property.";

      dispatch(setError(message));
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  
  
  
  const removeExistingProperty = async (propertyId) => {
    dispatch(setLoading(true));

    try {
      const response = await deleteProperty(propertyId);

      dispatch(removeProperty(propertyId));

      toast.success(response.message);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to delete property.";

      dispatch(setError(message));
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    fetchProperties,
    fetchMyProperties,
    fetchPropertyById,
    createNewProperty,
    editProperty,
    removeExistingProperty,
  };
};
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  setLoading,
  setError,
  clearError,
  setProfile,
  updateProfile as updateProfileState,
  passwordChanged,
  clearProfile,
} from "../profileSlice";

import {
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount,
} from "../services/profileApi";


import {
  setUser,
  logout,
} from "../../auth/authSlice";

export const useProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  
  

  const fetchProfile = async () => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());

      const response = await getProfile();

      dispatch(setProfile(response.data));

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to fetch profile.";

      dispatch(setError(message));
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  
  
  

  const updateUserProfile = async (formData) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());

      const response = await updateProfile(formData);

      dispatch(updateProfileState(response.data));

      
    dispatch(setUser(response.data));

      toast.success(response.message);

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to update profile.";

      dispatch(setError(message));
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  
  
  

  const updatePassword = async (passwordData) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());

      const response = await changePassword(passwordData);

      dispatch(passwordChanged());

      toast.success(response.message);

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to change password.";

      dispatch(setError(message));
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  
  
  

  const removeAccount = async () => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());

      const response = await deleteAccount();

      dispatch(clearProfile());
dispatch(logout());
      

      toast.success(response.message);

      navigate("/");

    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to delete account.";

      dispatch(setError(message));
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    fetchProfile,
    updateUserProfile,
    updatePassword,
    removeAccount,
  };
};
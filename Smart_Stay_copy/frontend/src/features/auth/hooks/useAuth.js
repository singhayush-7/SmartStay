import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
  forgotPassword as apiForgotPassword,
  resetPassword as apiResetPassword,
} from "../services/authApi";

import {
  setLoading,
  setUser,
  logout,
  setError,
  setInitialized,
} from "../authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  
  
  const login = async (credentials) => {
    dispatch(setLoading(true));

    try {
      const response = await loginUser(credentials);
      
      if (response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
      }

      dispatch(setUser(response.data.user));

      toast.success(response.message);

      navigate("/dashboard");
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Login failed.";
      dispatch(setError(errorMsg));
      toast.error(errorMsg);
    } finally {
      dispatch(setLoading(false));
    }
  };

  
  
  
  const register = async (userData) => {
    dispatch(setLoading(true));

    try {
      const response = await registerUser(userData);

      if (response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
      }

      dispatch(setUser(response.data.user));

      toast.success(response.message);

      navigate("/dashboard");
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Registration failed.";
      dispatch(setError(errorMsg));
      toast.error(errorMsg);
    } finally {
      dispatch(setLoading(false));
    }
  };

  
  
  
  const logoutHandler = async () => {
    dispatch(setLoading(true));

    try {
      await logoutUser();

      localStorage.removeItem("accessToken");
      dispatch(logout());

      toast.success("Logged out successfully.");

      navigate("/login");
    } catch (error) {
      localStorage.removeItem("accessToken");
      dispatch(logout());
      navigate("/login");
    } finally {
      dispatch(setLoading(false));
    }
  };

  
  
  
  const fetchCurrentUser = async () => {
    dispatch(setLoading(true));

    try {
      const response = await getCurrentUser();

      dispatch(setUser(response.data));
    } catch (error) {
      localStorage.removeItem("accessToken");
      dispatch(logout());
    } finally {
      dispatch(setInitialized(true));
      dispatch(setLoading(false));
    }
  };

  
  
  
  const forgotPasswordHandler = async (email) => {
    dispatch(setLoading(true));
    try {
      const response = await apiForgotPassword(email);
      toast.success(response.message || "Password reset email sent.");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send reset email.");
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  };

  
  
  
  const resetPasswordHandler = async (token, password) => {
    dispatch(setLoading(true));
    try {
      const response = await apiResetPassword(token, password);
      toast.success(response.message || "Password reset successfully.");
      navigate("/login");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password.");
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    login,
    register,
    logoutHandler,
    fetchCurrentUser,
    forgotPassword: forgotPasswordHandler,
    resetPassword: resetPasswordHandler,
  };
};
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import {
  setLoading,
  setError,
  clearError,
  setPayments,
  setPayment,
  addPayment,
  updatePayment,
  removePayment,
} from "../paymentSlice";

import {
  createPayment as createPaymentApi,
  getMyPayments as getMyPaymentsApi,
  getOwnerPayments as getOwnerPaymentsApi,
  getPaymentById as getPaymentByIdApi,
  markPaymentAsPaid as markPaymentAsPaidApi,
  deletePayment as deletePaymentApi,
} from "../services/paymentApi";

export const usePayment = () => {
  const dispatch = useDispatch();

  const paymentState = useSelector(
    (state) => state.payment
  );

  

  const fetchMyPayments = async () => {
    dispatch(setLoading(true));

    try {
      const res = await getMyPaymentsApi();

      dispatch(setPayments(res.data));
      dispatch(clearError());
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to fetch payments.";

      dispatch(setError(message));
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  

  const fetchOwnerPayments = async () => {
    dispatch(setLoading(true));

    try {
      const res = await getOwnerPaymentsApi();

      dispatch(setPayments(res.data));
      dispatch(clearError());
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to fetch owner payments.";

      dispatch(setError(message));
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  

  const fetchPaymentById = async (id) => {
    dispatch(setLoading(true));

    try {
      const res = await getPaymentByIdApi(id);

      dispatch(setPayment(res.data));
      dispatch(clearError());
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to fetch payment.";

      dispatch(setError(message));
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  

  const createPayment = async (paymentData) => {
    dispatch(setLoading(true));

    try {
      const res = await createPaymentApi(paymentData);

      dispatch(addPayment(res.data));

      toast.success("Payment created successfully.");

      return true;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to create payment.";

      dispatch(setError(message));
      toast.error(message);

      return false;
    } finally {
      dispatch(setLoading(false));
    }
  };

  

  const payNow = async (id) => {
    dispatch(setLoading(true));

    try {
      const res = await markPaymentAsPaidApi(id);

      dispatch(updatePayment(res.data));

      toast.success("Payment successful.");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Payment failed.";

      dispatch(setError(message));
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  

  const deletePayment = async (id) => {
    dispatch(setLoading(true));

    try {
      await deletePaymentApi(id);

      dispatch(removePayment(id));

      toast.success("Payment deleted.");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to delete payment.";

      dispatch(setError(message));
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    ...paymentState,

    fetchMyPayments,
    fetchOwnerPayments,
    fetchPaymentById,
    createPayment,
    payNow,
    deletePayment,
  };
};
import api from "../../../api/axios";



export const createPayment = async (paymentData) => {
  const { data } = await api.post(
    "/payments",
    paymentData
  );

  return data;
};



export const getMyPayments = async () => {
  const { data } = await api.get(
    "/payments/my-payments"
  );

  return data;
};



export const getOwnerPayments = async () => {
  const { data } = await api.get(
    "/payments/owner"
  );

  return data;
};



export const getPaymentById = async (
  paymentId
) => {
  const { data } = await api.get(
    `/payments/${paymentId}`
  );

  return data;
};



export const markPaymentAsPaid = async (
  paymentId
) => {
  const { data } = await api.put(
    `/payments/${paymentId}/pay`
  );

  return data;
};



export const deletePayment = async (
  paymentId
) => {
  const { data } = await api.delete(
    `/payments/${paymentId}`
  );

  return data;
};
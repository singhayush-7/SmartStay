import api from "../../../api/axios";



export const createComplaint = async (formData) => {
  const { data } = await api.post(
    "/complaints",
    formData
  );

  return data;
};



export const getMyComplaints = async () => {
  const { data } = await api.get("/complaints/my-complaints");

  return data;
};



export const getPropertyComplaints = async (
  propertyId
) => {
  const { data } = await api.get(
    `/complaints/property/${propertyId}`
  );

  return data;
};



export const getComplaintById = async (
  complaintId
) => {
  const { data } = await api.get(
    `/complaints/${complaintId}`
  );

  return data;
};



export const updateComplaint = async (
  complaintId,
  formData
) => {
  const { data } = await api.put(
    `/complaints/${complaintId}`,
    formData
  );

  return data;
};



export const updateComplaintStatus = async (
  complaintId,
  status,
  ownerRemarks = ""
) => {
  const { data } = await api.put(
    `/complaints/${complaintId}/status`,
    {
      status,
      ownerRemarks,
    }
  );

  return data;
};



export const deleteComplaint = async (
  complaintId
) => {
  const { data } = await api.delete(
    `/complaints/${complaintId}`
  );

  return data;
};
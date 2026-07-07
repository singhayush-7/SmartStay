import api from "../../../api/axios";




export const getAllProperties = async (params = {}) => {
  const response = await api.get("/properties", {
    params,
  });

  return response.data;
};




export const getPropertyById = async (propertyId) => {
  const response = await api.get(
    `/properties/${propertyId}`
  );

  return response.data;
};




export const createProperty = async (propertyData) => {
  const formData = new FormData();

  Object.entries(propertyData).forEach(([key, value]) => {
    if (key === "images") {
      value.forEach((image) => {
        formData.append("images", image.file);
      });
    } else if (Array.isArray(value)) {
      formData.append(key, value.join(","));
    } else {
      formData.append(key, value);
    }
  });

  const response = await api.post(
    "/properties",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};




export const updateProperty = async (
  propertyId,
  propertyData
) => {
  const formData = new FormData();

  Object.entries(propertyData).forEach(([key, value]) => {
    if (key === "images") {
      value.forEach((image) => {
        if (image.file) {
          formData.append("images", image.file);
        }
      });
    } else if (Array.isArray(value)) {
      formData.append(key, value.join(","));
    } else {
      formData.append(key, value);
    }
  });

  const response = await api.put(
    `/properties/${propertyId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};




export const deleteProperty = async (propertyId) => {
  const response = await api.delete(
    `/properties/${propertyId}`
  );

  return response.data;
};




export const getMyProperties = async () => {
  const response = await api.get(
    "/properties/my-properties"
  );

  return response.data;
};
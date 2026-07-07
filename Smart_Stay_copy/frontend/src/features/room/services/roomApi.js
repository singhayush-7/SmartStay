import api from "../../../api/axios";





export const createRoom = async (roomData) => {
  const formData = new FormData();

  Object.entries(roomData).forEach(([key, value]) => {
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

  const response = await api.post(
    "/rooms",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};




export const getRoomById = async (roomId) => {
  const response = await api.get(
    `/rooms/${roomId}`
  );

  return response.data;
};





export const getRoomsByProperty =
  async (propertyId) => {
    const response = await api.get(
      `/rooms/property/${propertyId}`
    );

    return response.data;
  };





export const updateRoom = async (
  roomId,
  roomData
) => {
  const formData = new FormData();

  Object.entries(roomData).forEach(([key, value]) => {
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
    `/rooms/${roomId}`,
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};





export const deleteRoom = async (
  roomId
) => {
  const response = await api.delete(
    `/rooms/${roomId}`
  );

  return response.data;
};
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  setLoading,
  setError,
  clearError,
  setRooms,
  setSelectedRoom,
  addRoom,
  updateRoom,
  removeRoom,
} from "../roomSlice";

import {
  createRoom,
  getRoomById,
  getRoomsByProperty,
  updateRoom as updateRoomApi,
  deleteRoom,
} from "../services/roomApi";

export const useRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  
  

  const createNewRoom = async (roomData) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());

      const response = await createRoom(roomData);

      dispatch(addRoom(response.data));

      toast.success(response.message);

      navigate(-1);

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to create room.";

      dispatch(setError(message));
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  
  
  

  const fetchRoomsByProperty = async (
    propertyId
  ) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());

      const response =
        await getRoomsByProperty(propertyId);

      dispatch(setRooms(response.data));
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to fetch rooms.";

      dispatch(setError(message));
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  
  
  

  const fetchRoomById = async (roomId) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());

      const response =
        await getRoomById(roomId);

      dispatch(
        setSelectedRoom(response.data)
      );
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to fetch room.";

      dispatch(setError(message));
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  
  
  

  const editRoom = async (
    roomId,
    roomData
  ) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());

      const response =
        await updateRoomApi(
          roomId,
          roomData
        );

      dispatch(updateRoom(response.data));

      toast.success(response.message);

      navigate(-1);

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to update room.";

      dispatch(setError(message));
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  
  
  

  const removeExistingRoom = async (
    roomId
  ) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());

      const response =
        await deleteRoom(roomId);

      dispatch(removeRoom(roomId));

      toast.success(response.message);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to delete room.";

      dispatch(setError(message));
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    createNewRoom,
    fetchRoomsByProperty,
    fetchRoomById,
    editRoom,
    removeExistingRoom,
  };
};
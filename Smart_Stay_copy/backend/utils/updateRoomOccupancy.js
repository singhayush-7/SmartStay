import Room from "../models/room.model.js";
import Booking from "../models/booking.model.js";
import ApiError from "./ApiError.js";
import updatePropertyStats from "./updatePropertyStats.js";


const updateRoomOccupancy = async (roomId) => {
  const room = await Room.findById(roomId);

  if (!room) {
    throw new ApiError(404, "Room not found.");
  }

  
  const occupiedBeds = await Booking.countDocuments({
    room: roomId,
    status: "approved",
    isCheckedOut: false,
  });

  room.occupiedBeds = occupiedBeds;
  room.availableBeds = room.capacity - occupiedBeds;

  
  if (room.availableBeds < 0) {
    room.availableBeds = 0;
  }

  
  if (room.availableBeds === 0) {
    room.status = "full";
  } else {
    room.status = "available";
  }

  await room.save();

  
  await updatePropertyStats(room.property);
};

export default updateRoomOccupancy;
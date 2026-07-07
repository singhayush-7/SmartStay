import Property from "../models/property.model.js";
import Room from "../models/room.model.js";
import ApiError from "./ApiError.js";

const updatePropertyStats = async (propertyId) => {
  const property = await Property.findById(propertyId);

  if (!property) {
    throw new ApiError(404, "Property not found.");
  }

  const rooms = await Room.find({ property: propertyId });

  let totalRooms = rooms.length;
  let totalBeds = 0;
  let occupiedBeds = 0;
  let availableBeds = 0;

  rooms.forEach((room) => {
    totalBeds += room.capacity;
    occupiedBeds += room.occupiedBeds;
    availableBeds += room.availableBeds;
  });

  property.totalRooms = totalRooms;
  property.totalBeds = totalBeds;
  property.occupiedBeds = occupiedBeds;
  property.availableBeds = availableBeds;

  await property.save();
};

export default updatePropertyStats;
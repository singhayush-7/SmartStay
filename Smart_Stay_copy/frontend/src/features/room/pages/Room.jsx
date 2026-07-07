import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { useRoom } from "../hooks/useRoom";
import RoomCard from "../components/RoomCard";
import Button from "../../../components/ui/Button";

const Rooms = () => {
  const { propertyId } = useParams();

  const {
    fetchRoomsByProperty,
    removeExistingRoom,
  } = useRoom();

  const { rooms, loading } = useSelector(
    (state) => state.room
  );

  useEffect(() => {
    if (propertyId) {
      fetchRoomsByProperty(propertyId);
    }
  }, [propertyId]);

  const handleDelete = async (roomId) => {
    await removeExistingRoom(roomId);
  };

  if (!propertyId) {
    return (
      <div className="p-6 text-center py-20">
        <h2 className="text-xl font-semibold text-slate-700">
          No Property Selected
        </h2>
        <p className="mt-2 text-slate-500">
          Please select a property to view its rooms.
        </p>
        <Link to="/dashboard/properties" className="mt-4 inline-block rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
          Go to Properties
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Rooms
        </h1>

        <Link
          to={`/dashboard/properties/${propertyId}/rooms/create`}
        >
          <Button>Add Room</Button>
        </Link>
      </div>

      {}
      {loading && (
        <p className="text-gray-500">
          Loading rooms...
        </p>
      )}

      {}
      {!loading && rooms.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">
            No rooms found for this property.
          </p>
        </div>
      )}

      {}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <RoomCard
            key={room._id}
            room={room}
            propertyId={propertyId}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Rooms;
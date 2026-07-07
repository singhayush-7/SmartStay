import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import RoomForm from "../components/RoomForm";
import { useRoom } from "../hooks/useRoom";

const EditRoom = () => {
  const { roomId } = useParams();

  const { fetchRoomById, editRoom } = useRoom();

  const { selectedRoom } = useSelector(
    (state) => state.room
  );

  useEffect(() => {
    fetchRoomById(roomId);
  }, [roomId]);

  const submitHandler = async (data) => {
    await editRoom(roomId, data);
  };

  if (!selectedRoom) {
    return (
      <div className="p-6">
        Loading room...
      </div>
    );
  }

  return (
    <div className="p-6">
      <RoomForm
        propertyId={selectedRoom.property}
        defaultValues={selectedRoom}
        isEdit={true}
        onSubmit={submitHandler}
      />
    </div>
  );
};

export default EditRoom;
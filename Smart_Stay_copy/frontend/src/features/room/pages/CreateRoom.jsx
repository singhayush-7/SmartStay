import { useParams } from "react-router-dom";

import RoomForm from "../components/RoomForm";
import { useRoom } from "../hooks/useRoom";

const CreateRoom = () => {
  const { propertyId } = useParams();

  const { createNewRoom } = useRoom();

  const submitHandler = async (data) => {
    await createNewRoom(data);
  };

  return (
    <div className="p-6">
      <RoomForm
        propertyId={propertyId}
        onSubmit={submitHandler}
      />
    </div>
  );
};

export default CreateRoom;
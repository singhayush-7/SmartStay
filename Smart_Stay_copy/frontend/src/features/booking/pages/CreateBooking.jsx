import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useBooking } from "../hooks/useBooking";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

const CreateBooking = () => {
  const { propertyId, roomId } = useParams();
  const navigate = useNavigate();

  const { createNewBooking } = useBooking();

  const { rooms } = useSelector(
    (state) => state.room
  );

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [loadingRoom, setLoadingRoom] = useState(false);
  
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (roomId && rooms?.length) {
      const room = rooms.find(
        (r) => r._id === roomId
      );
      setSelectedRoom(room || null);
    }
  }, [roomId, rooms]);

  const handleBooking = async () => {
    if (!selectedRoom) return;

    const bookingData = {
      property: propertyId,
      room: selectedRoom._id,
      rent: selectedRoom.rent,
      securityDeposit: selectedRoom.securityDeposit,
      checkInDate,
      checkOutDate,
      message,
    };

    await createNewBooking(bookingData);

    navigate("/dashboard/my-bookings");
  };

  return (
    <div className="p-6">
      <Card className="max-w-2xl mx-auto p-6 space-y-6">
        <h2 className="text-2xl font-bold">
          Create Booking
        </h2>

        {}
        {selectedRoom ? (
          <div className="space-y-3">
            <p>
              <strong>Room:</strong>{" "}
              {selectedRoom.roomNumber}
            </p>

            <p>
              <strong>Type:</strong>{" "}
              {selectedRoom.roomType}
            </p>

            <p>
              <strong>Rent:</strong> ₹
              {selectedRoom.rent}
            </p>

            <p>
              <strong>Security Deposit:</strong> ₹
              {selectedRoom.securityDeposit}
            </p>
          </div>
        ) : (
          <p className="text-gray-500">
            No room selected
          </p>
        )}

        {}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Check-In Date</label>
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-3 outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Check-Out Date</label>
              <input
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-3 outline-none"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Message (Optional)</label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-lg border border-slate-300 p-3 outline-none"
              placeholder="Any special requests?"
            />
          </div>
        </div>

        {}
        <Button
          onClick={handleBooking}
          disabled={!selectedRoom || !checkInDate || !checkOutDate}
          className="w-full"
        >
          Confirm Booking
        </Button>
      </Card>
    </div>
  );
};

export default CreateBooking;
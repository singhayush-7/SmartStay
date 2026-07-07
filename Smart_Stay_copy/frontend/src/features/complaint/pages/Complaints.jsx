import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import ComplaintForm from "../components/ComplaintForm";
import ComplaintList from "../components/ComplaintList";
import { useComplaint } from "../hooks/useComplaint";
import { useBooking } from "../../booking/hooks/useBooking";

const Complaints = () => {
  const { user } = useSelector((state) => state.auth);

  const { properties } = useSelector(
    (state) => state.property
  );

  const { rooms } = useSelector(
    (state) => state.room
  );

  const {
    complaints,
    loading,
    fetchMyComplaints,
    fetchPropertyComplaints,
    createComplaint,
    updateComplaintStatus,
    deleteComplaint,
  } = useComplaint();

  const { fetchMyBookings, bookings } = useBooking();

  const [selectedPropertyId, setSelectedPropertyId] = useState("");
  const [tenantProperties, setTenantProperties] = useState([]);
  const [tenantRooms, setTenantRooms] = useState([]);

  useEffect(() => {
    if (properties.length > 0 && !selectedPropertyId) {
      setSelectedPropertyId(properties[0]._id);
    }
  }, [properties]);

  useEffect(() => {
    if (!user) return;

    if (user.role === "tenant") {
      fetchMyComplaints();
      fetchMyBookings().then((data) => {
        if (data) {
          const props = [];
          const rms = [];
          const seenProps = new Set();
          const seenRooms = new Set();
          
          data.forEach((b) => {
            if (["approved", "completed"].includes(b.status) && b.property && b.room) {
              if (!seenProps.has(b.property._id)) {
                props.push(b.property);
                seenProps.add(b.property._id);
              }
              if (!seenRooms.has(b.room._id)) {
                rms.push({ ...b.room, property: b.property._id });
                seenRooms.add(b.room._id);
              }
            }
          });
          setTenantProperties(props);
          setTenantRooms(rms);
        }
      });
    } else if ((user.role === "owner" || user.role === "admin") && selectedPropertyId) {
      fetchPropertyComplaints(selectedPropertyId);
    }
  }, [user, selectedPropertyId]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Complaints
          </h1>

          <p className="mt-2 text-slate-500">
            Manage complaints raised by tenants.
          </p>
        </div>

        {(user.role === "owner" || user.role === "admin") && properties.length > 0 && (
          <div>
            <select
              className="rounded-lg border border-slate-300 p-2 outline-none"
              value={selectedPropertyId}
              onChange={(e) => setSelectedPropertyId(e.target.value)}
            >
              {properties.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {}

      {user?.role === "tenant" && (
        <ComplaintForm
          properties={tenantProperties}
          rooms={tenantRooms}
          loading={loading}
          onSubmit={createComplaint}
        />
      )}

      {}

      <ComplaintList
        complaints={complaints}
        role={user?.role}
        onDelete={deleteComplaint}
        onStatusChange={
          updateComplaintStatus
        }
      />
    </div>
  );
};

export default Complaints;
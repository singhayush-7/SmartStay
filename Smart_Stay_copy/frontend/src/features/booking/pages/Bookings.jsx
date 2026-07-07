import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Search, Filter, CalendarCheck, CalendarDays } from "lucide-react";

import { useBooking } from "../hooks/useBooking";
import BookingCard from "../components/BookingCard";
import { usePayment } from "../../payment/hooks/usePayment";
import clsx from "clsx";

const MyBookings = () => {
  const { fetchMyBookings, fetchPropertyBookings, cancel, removeBookingById, approve, reject } = useBooking();
  const { createPayment } = usePayment();
  const navigate = useNavigate();
  const { propertyId } = useParams();

  const { user } = useSelector((state) => state.auth);
  const { bookings, loading } = useSelector((state) => state.booking);
  
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const isOwnerAdmin = user?.role === "admin" || user?.role === "owner";

  useEffect(() => {
    if (propertyId) {
      fetchPropertyBookings(propertyId);
    } else if (user?.role === "tenant" || isOwnerAdmin) {
      // If owner/admin accesses /dashboard/bookings directly, they might need a global fetch 
      // but API currently only supports fetchPropertyBookings or fetchMyBookings. 
      // We will fallback to fetchMyBookings if tenant, else they shouldn't be here without propertyId.
      if (user?.role === "tenant") fetchMyBookings();
    }
  }, [user, propertyId]);

  const handleCancel = async (id) => await cancel(id);
  const handleDelete = async (id) => await removeBookingById(id);
  
  const handleGeneratePayment = async (id) => {
    const success = await createPayment({
      bookingId: id,
      paymentMethod: "Credit Card",
    });
    if (success) navigate("/dashboard/payments");
  };

  const filteredBookings = bookings.filter(b => {
    if (filter !== 'all' && b.status !== filter) return false;
    if (search && b.property?.name && !b.property.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const tabs = [
    { id: 'all', label: 'All Bookings' },
    { id: 'pending', label: 'Pending' },
    { id: 'approved', label: 'Approved' },
    { id: 'completed', label: 'Completed' },
    { id: 'cancelled', label: 'Cancelled' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            {isOwnerAdmin && !propertyId ? "Global Bookings" : "Booking Management"}
          </h1>
          <p className="mt-2 text-slate-500">
            {user?.role === "tenant" 
              ? "Track and manage your stay applications." 
              : "Review and process tenant booking requests."}
          </p>
        </div>
      </div>

      {}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex overflow-x-auto w-full sm:w-auto hide-scrollbar gap-1 p-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={clsx(
                "px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition",
                filter === tab.id 
                  ? "bg-indigo-50 text-indigo-700" 
                  : "text-slate-600 hover:bg-slate-50"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64 px-1 pb-1 sm:p-0">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search properties..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
          />
        </div>
      </div>

      {}
      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1,2,3,4,5,6].map(i => <div key={i} className="h-64 bg-slate-200 rounded-2xl animate-pulse"></div>)}
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
          <CalendarCheck size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-lg font-medium text-slate-900">No bookings found</h3>
          <p className="text-slate-500 mt-1 max-w-sm mx-auto">
            {search || filter !== 'all' 
              ? "Try adjusting your filters or search query to find what you're looking for." 
              : (user?.role === "tenant" 
                  ? "You haven't made any booking requests yet. Browse properties to get started." 
                  : "Please select a property from the dashboard to view its specific bookings.")}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBookings.map((booking) => (
            <BookingCard
              key={booking._id}
              booking={booking}
              ownerView={isOwnerAdmin}
              onCancel={handleCancel}
              onDelete={handleDelete}
              onGeneratePayment={handleGeneratePayment}
              onApprove={approve}
              onReject={reject}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
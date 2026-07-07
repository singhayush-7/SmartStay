import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  Home, 
  MapPin, 
  Phone, 
  CreditCard, 
  AlertCircle, 
  Clock, 
  FileText, 
  Bell,
  MessageSquare,
  ShieldAlert,
  Download
} from "lucide-react";
import { useSelector } from "react-redux";
import { getTenantDashboard } from "../services/dashboardApi";
import { tenantNotices } from "../../../utils/mockData";

const TenantDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getTenantDashboard();
        setData(res.data);
      } catch (error) {
        console.error("Failed to fetch tenant dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="h-8 bg-slate-200 rounded w-1/4 animate-pulse"></div>
        <div className="h-64 bg-slate-200 rounded-2xl animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-48 bg-slate-200 rounded-2xl animate-pulse"></div>
          <div className="h-48 bg-slate-200 rounded-2xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  const booking = data?.activeBooking;

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Welcome home, {user?.name.split(' ')[0]}
          </h1>
          <p className="mt-2 text-slate-500">
            Here's everything you need to know about your stay.
          </p>
        </div>
        <button className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition relative">
          <Bell size={20} className="text-slate-600" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </div>

      {}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-8 -mt-8 opacity-50 pointer-events-none"></div>
            
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Home className="text-indigo-600" /> Your Current Stay
            </h2>
            
            {booking ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Property</p>
                  <p className="text-lg font-semibold text-slate-900 mt-1">{booking.property?.name || 'SmartStay Residences'}</p>
                  <p className="text-slate-500 flex items-center gap-1 mt-1 text-sm">
                    <MapPin size={14} /> {booking.property?.city || 'City Center, District 9'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Room</p>
                  <p className="text-2xl font-bold text-indigo-600 mt-1">
                    Room {booking.room?.roomNumber || '101'}
                  </p>
                  <p className="text-slate-500 text-sm mt-1">
                    {booking.room?.roomType || 'Single Room'} • Floor {booking.room?.floor || '1'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                <p className="text-slate-500 font-medium">You don't have an active booking right now.</p>
                <Link to="/dashboard/bookings" className="mt-4 inline-block text-indigo-600 font-medium hover:underline">
                  Find a property
                </Link>
              </div>
            )}
          </div>

          {}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/dashboard/payments" className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-3 hover:-translate-y-1 transition-transform group text-center">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                <CreditCard size={24} />
              </div>
              <span className="font-medium text-slate-700 text-sm">Pay Rent</span>
            </Link>
            <Link to="/dashboard/complaints" className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-3 hover:-translate-y-1 transition-transform group text-center">
              <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                <AlertCircle size={24} />
              </div>
              <span className="font-medium text-slate-700 text-sm">Raise Complaint</span>
            </Link>
            <Link to="/dashboard/payments" className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-3 hover:-translate-y-1 transition-transform group text-center">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center group-hover:bg-green-100 transition-colors">
                <Download size={24} />
              </div>
              <span className="font-medium text-slate-700 text-sm">Receipts</span>
            </Link>
            <button className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-3 hover:-translate-y-1 transition-transform group text-center">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <MessageSquare size={24} />
              </div>
              <span className="font-medium text-slate-700 text-sm">Contact Owner</span>
            </button>
          </div>
        </div>

        {}
        <div className="space-y-6">
          {}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="font-bold text-slate-900 mb-4">Financial Overview</h2>
            <div className="p-4 bg-red-50 rounded-xl border border-red-100 mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-red-600 font-medium text-sm">Rent Due</span>
                <span className="text-xs text-red-500 font-semibold bg-white px-2 py-0.5 rounded-full border border-red-200">Due in 3 days</span>
              </div>
              <p className="text-2xl font-bold text-red-700">,1{booking ? booking.monthlyRent : '0'}</p>
            </div>
            <div className="flex justify-between items-center text-sm p-2">
              <span className="text-slate-500">Security Deposit</span>
              <span className="font-medium text-slate-900">,1{booking ? booking.depositAmount : '0'} <span className="text-green-500 ml-1 text-xs px-1.5 py-0.5 bg-green-50 rounded">Paid</span></span>
            </div>
          </div>

          {}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <FileText size={18} className="text-slate-400" /> Property Notices
            </h2>
            <div className="space-y-4">
              {tenantNotices.map((notice) => (
                <div key={notice.id} className="border-l-2 border-indigo-500 pl-3">
                  <h4 className="text-sm font-semibold text-slate-900">{notice.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{notice.date}</p>
                  <p className="text-sm text-slate-600 mt-1 leading-snug">{notice.message}</p>
                </div>
              ))}
            </div>
          </div>

          {}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="font-bold text-slate-900 mb-4">Important Contacts</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <ShieldAlert className="text-red-500" size={20} />
                <div>
                  <p className="text-sm font-semibold text-slate-900">Emergency</p>
                  <p className="text-xs text-slate-500">+91 999 888 7777</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <Phone className="text-indigo-500" size={20} />
                <div>
                  <p className="text-sm font-semibold text-slate-900">Property Manager</p>
                  <p className="text-xs text-slate-500">+91 987 654 3210</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantDashboard;
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { 
  Building2, 
  Users, 
  CreditCard, 
  AlertTriangle, 
  TrendingUp,
  Activity,
  CalendarCheck,
  Bell,
  Wallet,
  Clock
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';

import { useProperty } from "../../property/hooks/useProperty";
import { useBooking } from "../../booking/hooks/useBooking";
import PropertyCard from "../../property/components/PropertyCard";
import BookingCard from "../../booking/components/BookingCard";
import { getOwnerDashboard } from "../services/dashboardApi";
import { revenueData, occupancyData, recentActivities, notifications } from "../../../utils/mockData";

const OwnerDashboard = () => {
  const { fetchMyProperties } = useProperty();
  const { fetchPropertyBookings, approve, reject } = useBooking();

  const { properties } = useSelector((state) => state.property);
  const { bookings, loading: bookingsLoading } = useSelector((state) => state.booking);

  const [selectedProperty, setSelectedProperty] = useState(null);
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    fetchMyProperties();
    const fetchStats = async () => {
      try {
        const res = await getOwnerDashboard();
        setStats(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setStatsLoading(false);
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    if (selectedProperty) {
      fetchPropertyBookings(selectedProperty._id);
    }
  }, [selectedProperty]);

  
  const totalRooms = properties.reduce((acc, prop) => acc + (prop.rooms || 0), 0);
  const totalProperties = stats?.totalProperties || properties.length;
  const activeBookings = stats?.activeBookings || 0;
  const pendingComplaints = stats?.pendingComplaints || 0;
  const totalRevenue = stats?.totalRevenue || 0;
  
  
  const vacantRooms = Math.max(totalRooms - activeBookings, 0) || 5; 
  const occupancyRate = totalRooms ? Math.round((activeBookings / totalRooms) * 100) : 75;

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">

      {}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Overview</h1>
          <p className="text-slate-500 mt-1">Here's how your properties are performing today.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition relative">
            <Bell size={20} className="text-slate-600" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition shadow-sm flex items-center gap-2">
            <Building2 size={18} />
            Add Property
          </button>
        </div>
      </div>

      {}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Today's Revenue</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">,1{totalRevenue > 0 ? (totalRevenue / 30).toFixed(0) : '4,250'}</h3>
            </div>
            <div className="p-3 bg-green-50 rounded-xl">
              <Wallet className="text-green-600" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp size={16} className="text-green-500 mr-1" />
            <span className="text-green-500 font-medium">+12%</span>
            <span className="text-slate-400 ml-2">from yesterday</span>
          </div>
        </div>

        {}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Occupancy Rate</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">{occupancyRate}%</h3>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl">
              <Activity className="text-blue-600" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp size={16} className="text-green-500 mr-1" />
            <span className="text-green-500 font-medium">+5%</span>
            <span className="text-slate-400 ml-2">from last month</span>
          </div>
        </div>

        {}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Active Bookings</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">{activeBookings}</h3>
            </div>
            <div className="p-3 bg-indigo-50 rounded-xl">
              <CalendarCheck className="text-indigo-600" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-slate-500">{vacantRooms} rooms vacant</span>
          </div>
        </div>

        {}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Pending Actions</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">{pendingComplaints + 3}</h3>
            </div>
            <div className="p-3 bg-red-50 rounded-xl">
              <AlertTriangle className="text-red-600" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm gap-3">
            <span className="text-red-500 font-medium">{pendingComplaints} complaints</span>
            <span className="text-orange-500 font-medium">3 rent overdue</span>
          </div>
        </div>
      </div>

      {}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-900">Revenue Trend</h2>
            <select className="bg-slate-50 border-none text-sm font-medium text-slate-600 rounded-lg p-2 focus:ring-0">
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`,1${value}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Recent Activity</h2>
          <div className="flex-1 overflow-y-auto pr-2 space-y-6">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex gap-4">
                <div className="mt-1">
                  {activity.type === 'payment' && <div className="p-2 bg-green-100 text-green-600 rounded-full"><Wallet size={16}/></div>}
                  {activity.type === 'complaint' && <div className="p-2 bg-red-100 text-red-600 rounded-full"><AlertTriangle size={16}/></div>}
                  {activity.type === 'booking' && <div className="p-2 bg-blue-100 text-blue-600 rounded-full"><CalendarCheck size={16}/></div>}
                  {activity.type === 'maintenance' && <div className="p-2 bg-orange-100 text-orange-600 rounded-full"><Activity size={16}/></div>}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">{activity.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">{activity.description}</p>
                  <p className="text-xs text-slate-400 mt-1 font-medium">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-900">Manage Properties</h2>
          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">View All</button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {properties.map((property) => (
            <div
              key={property._id}
              onClick={() => setSelectedProperty(property)}
              className={`cursor-pointer transition-all duration-200 ${
                selectedProperty?._id === property._id
                  ? "ring-2 ring-indigo-600 ring-offset-2 scale-[1.02]"
                  : "hover:-translate-y-1 hover:shadow-md"
              }`}
            >
              <PropertyCard property={property} isOwner={true} />
            </div>
          ))}
          {properties.length === 0 && (
            <div className="col-span-full py-12 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
              <Building2 className="mx-auto text-slate-400 mb-3" size={32} />
              <h3 className="text-lg font-medium text-slate-900">No properties yet</h3>
              <p className="text-slate-500 mt-1 mb-4">Add your first property to start managing.</p>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700">
                Add Property
              </button>
            </div>
          )}
        </div>
      </section>

      {}
      {selectedProperty && (
        <section className="bg-slate-50 -mx-6 px-6 py-8 border-t border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900">
                Booking Requests <span className="text-slate-500 font-normal text-lg ml-2">for {selectedProperty.name}</span>
              </h2>
            </div>

            {bookingsLoading ? (
              <div className="grid gap-6 lg:grid-cols-2">
                {[1,2].map(i => (
                  <div key={i} className="h-48 bg-slate-200 rounded-2xl animate-pulse"></div>
                ))}
              </div>
            ) : bookings.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl text-center shadow-sm border border-slate-100">
                <CalendarCheck className="mx-auto text-slate-300 mb-3" size={40} />
                <p className="text-slate-500 font-medium">No pending booking requests.</p>
              </div>
            ) : (
              <div className="grid gap-6 lg:grid-cols-2">
                {bookings.map((booking) => (
                  <BookingCard
                    key={booking._id}
                    booking={booking}
                    ownerView
                    onApprove={() => approve(booking._id)}
                    onReject={() => reject(booking._id)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default OwnerDashboard;
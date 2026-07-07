import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  Users, 
  Building2, 
  Activity, 
  Settings, 
  AlertTriangle,
  TrendingUp,
  FileText,
  CreditCard
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

import { getAdminDashboard } from "../services/dashboardApi";
import { revenueData } from "../../../utils/mockData";

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAdminDashboard();
        setData(res.data);
      } catch (error) {
        console.error("Failed to fetch admin dashboard:", error);
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1,2,3,4].map(i => <div key={i} className="h-32 bg-slate-200 rounded-2xl animate-pulse"></div>)}
        </div>
        <div className="h-80 bg-slate-200 rounded-2xl animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Admin Overview</h1>
          <p className="mt-2 text-slate-500">Monitor system performance and global platform metrics.</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition shadow-sm flex items-center gap-2">
          <Settings size={18} />
          System Settings
        </button>
      </div>

      {}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Total Users</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">{data?.totalUsers || 42}</h3>
            </div>
            <div className="p-3 bg-indigo-50 rounded-xl">
              <Users className="text-indigo-600" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-500 font-medium">
            <TrendingUp size={16} className="mr-1" /> +12% this month
          </div>
        </div>

        {}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Listed Properties</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">{data?.totalProperties || 8}</h3>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl">
              <Building2 className="text-blue-600" size={24} />
            </div>
          </div>
          <div className="mt-4 text-sm text-slate-500">
            {data?.totalRooms || 45} total rooms across properties
          </div>
        </div>

        {}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Platform Revenue</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">,1{data?.totalRevenue || '120k'}</h3>
            </div>
            <div className="p-3 bg-green-50 rounded-xl">
              <CreditCard className="text-green-600" size={24} />
            </div>
          </div>
          <div className="mt-4 text-sm text-slate-500">
            {data?.totalBookings || 120} total successful bookings
          </div>
        </div>

        {}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Pending Complaints</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">{data?.pendingComplaints || 5}</h3>
            </div>
            <div className="p-3 bg-orange-50 rounded-xl">
              <AlertTriangle className="text-orange-600" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-orange-500 font-medium">
            Requires immediate attention
          </div>
        </div>
      </div>

      {}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 lg:col-span-2">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Platform Revenue Growth</h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`,1${value}`, 'Revenue']}
                  cursor={{fill: '#f8fafc'}}
                />
                <Bar dataKey="revenue" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Administration</h2>
          <div className="grid grid-cols-2 gap-4 flex-1">
            <Link to="/dashboard/users" className="bg-slate-50 p-4 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-slate-100 transition border border-slate-100">
              <Users className="text-indigo-600" size={24} />
              <span className="text-sm font-medium text-slate-700">Manage Users</span>
            </Link>
            <Link to="/dashboard/properties" className="bg-slate-50 p-4 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-slate-100 transition border border-slate-100">
              <Building2 className="text-blue-600" size={24} />
              <span className="text-sm font-medium text-slate-700">Properties</span>
            </Link>
            <Link to="/dashboard/complaints" className="bg-slate-50 p-4 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-slate-100 transition border border-slate-100">
              <AlertTriangle className="text-orange-600" size={24} />
              <span className="text-sm font-medium text-slate-700">Complaints</span>
            </Link>
            <Link to="/dashboard/analytics" className="bg-slate-50 p-4 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-slate-100 transition border border-slate-100">
              <Activity className="text-green-600" size={24} />
              <span className="text-sm font-medium text-slate-700">System Logs</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
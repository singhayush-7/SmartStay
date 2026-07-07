import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { 
  CreditCard, 
  Download, 
  Search, 
  Filter, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Wallet
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import clsx from "clsx";

import PaymentList from "../components/PaymentList";
import { usePayment } from "../hooks/usePayment";
import { revenueData } from "../../../utils/mockData"; 

const Payments = () => {
  const { user } = useSelector((state) => state.auth);
  const { payments, loading, fetchMyPayments, fetchOwnerPayments, payNow, deletePayment } = usePayment();
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!user) return;
    if (user.role === "tenant") {
      fetchMyPayments();
    } else {
      fetchOwnerPayments();
    }
  }, [user]);

  const isOwnerAdmin = user?.role === "admin" || user?.role === "owner";

  
  const totalCollected = payments.filter(p => p.status === 'paid').reduce((acc, p) => acc + p.amount, 0);
  const totalPending = payments.filter(p => p.status === 'pending').reduce((acc, p) => acc + p.amount, 0);
  const overdueCount = payments.filter(p => p.status === 'failed').length; 

  const filteredPayments = payments.filter(p => {
    if (filter === 'all') return true;
    return p.status.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      
      {}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Financial Overview</h1>
          <p className="mt-2 text-slate-500">
            {isOwnerAdmin ? "Track revenue, pending payments, and transactions." : "Manage your rent payments and view receipts."}
          </p>
        </div>
        <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-50 transition shadow-sm flex items-center gap-2">
          <Download size={18} />
          Export Report
        </button>
      </div>

      {}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-3">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-50 rounded-lg text-green-600"><CheckCircle2 size={20}/></div>
            <p className="font-medium text-slate-500">{isOwnerAdmin ? "Total Collected" : "Total Paid"}</p>
          </div>
          <p className="text-3xl font-bold text-slate-900">,1{totalCollected || (isOwnerAdmin ? '24,500' : '4,800')}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-50 rounded-lg text-amber-600"><Clock size={20}/></div>
            <p className="font-medium text-slate-500">Pending Dues</p>
          </div>
          <p className="text-3xl font-bold text-slate-900">,1{totalPending || '0'}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-50 rounded-lg text-red-600"><AlertCircle size={20}/></div>
            <p className="font-medium text-slate-500">{isOwnerAdmin ? "Failed / Overdue" : "Overdue"}</p>
          </div>
          <p className="text-3xl font-bold text-slate-900">{overdueCount || '0'} <span className="text-base font-medium text-slate-500 ml-1">transactions</span></p>
        </div>
      </div>

      {}
      {isOwnerAdmin && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Monthly Revenue Collection</h2>
          <div className="h-64 w-full">
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
                <Bar dataKey="revenue" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-lg font-bold text-slate-900">Recent Transactions</h2>
          
          <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-200">
            {['all', 'paid', 'pending', 'failed'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={clsx(
                  "px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition",
                  filter === status 
                    ? "bg-white text-indigo-600 shadow-sm" 
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="p-6 space-y-4">
            {[1,2,3].map(i => <div key={i} className="h-16 bg-slate-100 rounded-xl animate-pulse"></div>)}
          </div>
        ) : (
          <div className="p-6">
            <PaymentList
              payments={filteredPayments}
              role={user?.role}
              onPay={payNow}
              onDelete={deletePayment}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Payments;
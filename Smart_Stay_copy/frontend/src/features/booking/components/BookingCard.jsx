import Button from "../../../components/ui/Button";
import {
  CheckCircle,
  XCircle,
  Clock,
  Trash2,
  Calendar,
  CreditCard,
  User,
  Home,
  MapPin,
  CalendarDays,
  MoreVertical
} from "lucide-react";
import clsx from "clsx";
import { format } from "date-fns";

const statusConfig = {
  pending: {
    color: "text-amber-600",
    bg: "bg-amber-100",
    icon: Clock,
    border: "border-amber-200"
  },
  approved: {
    color: "text-emerald-600",
    bg: "bg-emerald-100",
    icon: CheckCircle,
    border: "border-emerald-200"
  },
  completed: {
    color: "text-blue-600",
    bg: "bg-blue-100",
    icon: CheckCircle,
    border: "border-blue-200"
  },
  rejected: {
    color: "text-red-600",
    bg: "bg-red-100",
    icon: XCircle,
    border: "border-red-200"
  },
  cancelled: {
    color: "text-slate-600",
    bg: "bg-slate-100",
    icon: XCircle,
    border: "border-slate-200"
  },
};

const BookingCard = ({
  booking,
  ownerView = false,
  onApprove,
  onReject,
  onCancel,
  onDelete,
  onGeneratePayment,
}) => {
  const status = booking.status || "pending";
  const conf = statusConfig[status] || statusConfig.pending;
  const StatusIcon = conf.icon;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch {
      return "Invalid Date";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow relative group">
      
      {}
      <div className={clsx("h-1.5 w-full", conf.bg.replace('100', '400'))}></div>

      <div className="p-6">
        {}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-start gap-3">
            <div className={clsx("p-2 rounded-xl mt-1", conf.bg, conf.color)}>
              <StatusIcon size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 leading-tight">
                {booking.property?.name || "Property Name"}
              </h3>
              <p className="text-sm font-medium text-slate-500 mt-0.5 flex items-center gap-1">
                <Home size={14}/> Room {booking.room?.roomNumber || "N/A"}
              </p>
            </div>
          </div>
          <span className={clsx("px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border", conf.bg, conf.color, conf.border)}>
            {status}
          </span>
        </div>

        {}
        <div className="grid grid-cols-2 gap-4 bg-slate-50 rounded-xl p-4 border border-slate-100 mb-6">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Check In</p>
            <p className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
              <CalendarDays size={14} className="text-indigo-500"/>
              {formatDate(booking.checkInDate)}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Check Out</p>
            <p className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
              <CalendarDays size={14} className="text-slate-400"/>
              {formatDate(booking.checkOutDate)}
            </p>
          </div>
          <div className="col-span-2 pt-2 mt-2 border-t border-slate-200/60 flex justify-between">
             <div>
               <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Tenant</p>
               <p className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                 <User size={14} className="text-slate-400"/>
                 {booking.tenant?.name || "N/A"}
               </p>
             </div>
             <div className="text-right">
               <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Rent</p>
               <p className="text-sm font-bold text-green-600">
                 ,1{booking.monthlyRent || "0"}
               </p>
             </div>
          </div>
        </div>

        {}
        <div className="flex gap-3">
          {ownerView ? (
            <>
              {status === "pending" && (
                <>
                  <button
                    onClick={() => onApprove?.(booking._id)}
                    className="flex-1 bg-emerald-600 text-white font-medium py-2 rounded-lg hover:bg-emerald-700 transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => onReject?.(booking._id)}
                    className="flex-1 bg-white text-red-600 font-medium py-2 rounded-lg border border-red-200 hover:bg-red-50 transition"
                  >
                    Reject
                  </button>
                </>
              )}
            </>
          ) : (
            <>
              {status === "pending" && (
                <button
                  onClick={() => onCancel?.(booking._id)}
                  className="flex-1 bg-white text-orange-600 font-medium py-2 rounded-lg border border-orange-200 hover:bg-orange-50 transition"
                >
                  Cancel Request
                </button>
              )}
              {status === "approved" && (
                <button
                  onClick={() => onGeneratePayment?.(booking._id)}
                  className="flex-1 bg-indigo-600 text-white font-medium py-2 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2"
                >
                  <CreditCard size={18}/> Pay Rent
                </button>
              )}
              <button
                onClick={() => onDelete?.(booking._id)}
                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                title="Delete Record"
              >
                <Trash2 size={20} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
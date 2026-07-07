import { format } from "date-fns";
import { Download, CreditCard, ChevronRight, CheckCircle2, Clock, XCircle, Trash2, Banknote } from "lucide-react";
import clsx from "clsx";

const statusConfig = {
  pending: {
    bg: "bg-amber-100",
    text: "text-amber-700",
    icon: Clock
  },
  paid: {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    icon: CheckCircle2
  },
  failed: {
    bg: "bg-red-100",
    text: "text-red-700",
    icon: XCircle
  },
  refunded: {
    bg: "bg-slate-100",
    text: "text-slate-700",
    icon: Banknote
  },
};

const PaymentCard = ({
  payment,
  role,
  onPay,
  onDelete,
}) => {
  const status = payment.status?.toLowerCase() || 'pending';
  const conf = statusConfig[status] || statusConfig.pending;
  const StatusIcon = conf.icon;

  return (
    <div className="group border border-slate-100 rounded-2xl bg-white hover:border-indigo-100 hover:shadow-sm transition-all overflow-hidden mb-3">
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        {}
        <div className="flex items-center gap-4">
          <div className={clsx("p-3 rounded-2xl flex-shrink-0 transition-colors", conf.bg, conf.text, "group-hover:bg-indigo-50 group-hover:text-indigo-600")}>
            <CreditCard size={24} />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg tracking-tight">,1{payment.amount}</h3>
            <p className="text-sm font-medium text-slate-500 mt-0.5">
              {payment.property?.name || "Property Rent"} • Room {payment.booking?.room?.roomNumber || "N/A"}
            </p>
          </div>
        </div>

        {}
        <div className="flex flex-col sm:items-end gap-1 flex-1 sm:px-6">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span className="font-medium text-slate-900">{payment.tenant?.name || "N/A"}</span>
            <span className="text-slate-300">•</span>
            <span>
              {payment.createdAt ? format(new Date(payment.createdAt), "MMM dd, yyyy") : "-"}
            </span>
          </div>
          {payment.transactionId && (
            <p className="text-xs text-slate-400 font-mono">TXN: {payment.transactionId}</p>
          )}
        </div>

        {}
        <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-t-0 border-slate-100 pt-3 sm:pt-0">
          <div className={clsx("flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider", conf.bg, conf.text)}>
            <StatusIcon size={14} />
            {status}
          </div>

          <div className="flex items-center gap-2">
            {role === "tenant" && status === "pending" && (
              <button
                onClick={() => onPay(payment._id)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition shadow-sm"
              >
                Pay Now
              </button>
            )}

            {status === "paid" && (
              <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition" title="Download Receipt">
                <Download size={18} />
              </button>
            )}

            {role === "admin" && (
              <button
                onClick={() => onDelete(payment._id)}
                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
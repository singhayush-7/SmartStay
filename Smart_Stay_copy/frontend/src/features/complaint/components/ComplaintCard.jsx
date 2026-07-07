import { format } from "date-fns";
import { MessageSquare, Paperclip, MoreHorizontal, AlertCircle, Clock, MapPin, Building, User } from "lucide-react";
import clsx from "clsx";

const priorityColors = {
  low: "bg-slate-100 text-slate-700",
  medium: "bg-amber-100 text-amber-700",
  high: "bg-orange-100 text-orange-700",
  urgent: "bg-red-100 text-red-700",
};

const ComplaintCard = ({
  complaint,
  role,
  onStatusChange,
  onDelete,
  isBoardView = false
}) => {
  const isOwnerAdmin = role === "owner" || role === "admin";
  
  if (isBoardView) {
    return (
      <div className="bg-white rounded-xl p-4 border border-slate-200 hover:border-indigo-300 transition-colors group cursor-grab active:cursor-grabbing relative">
        <div className="flex justify-between items-start mb-2">
          <span className={clsx("px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider", priorityColors[complaint.priority] || priorityColors.medium)}>
            {complaint.priority}
          </span>
          {isOwnerAdmin && (
            <button className="text-slate-400 hover:text-slate-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreHorizontal size={16}/>
            </button>
          )}
        </div>
        
        <h4 className="font-semibold text-slate-800 text-sm mb-1 leading-tight">{complaint.title}</h4>
        <p className="text-xs text-slate-500 line-clamp-2 mb-3">{complaint.description}</p>
        
        <div className="flex flex-col gap-1.5 text-xs text-slate-500 mb-3 bg-slate-50 p-2 rounded-lg border border-slate-100">
           <div className="flex items-center gap-1.5 font-medium text-slate-700">
             <Building size={12}/> {complaint.property?.name || "Property"} • Rm {complaint.room?.roomNumber || "-"}
           </div>
           {isOwnerAdmin && (
             <div className="flex items-center gap-1.5">
               <User size={12}/> {complaint.tenant?.name || "Tenant"}
             </div>
           )}
        </div>

        <div className="flex justify-between items-end border-t border-slate-100 pt-3">
           <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
             <Clock size={12}/>
             {format(new Date(complaint.createdAt), "MMM d")}
           </div>
           
           <div className="flex items-center gap-2 text-slate-400">
             {complaint.ownerRemarks && <MessageSquare size={14} className="text-indigo-400"/>}
           </div>
        </div>
      </div>
    );
  }

  
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm mb-4">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 leading-tight">
            {complaint.title}
          </h2>
          <div className="flex items-center gap-2 mt-2">
            <span className={clsx("rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide", priorityColors[complaint.priority] || priorityColors.medium)}>
              {complaint.priority}
            </span>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600 capitalize">
              {complaint.category}
            </span>
          </div>
        </div>
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-bold capitalize text-indigo-700 border border-indigo-100">
          {complaint.status.replace("-", " ")}
        </span>
      </div>

      <p className="text-sm text-slate-600 mb-4 bg-slate-50 p-4 rounded-xl border border-slate-100 leading-relaxed">
        {complaint.description}
      </p>

      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500 border-t border-slate-100 pt-4">
        <p className="flex items-center gap-1"><Building size={14}/> {complaint.property?.name}</p>
        <p className="flex items-center gap-1"><MapPin size={14}/> Room {complaint.room?.roomNumber}</p>
        <p className="flex items-center gap-1"><Clock size={14}/> {format(new Date(complaint.createdAt), "dd MMM yyyy")}</p>
      </div>

      {complaint.ownerRemarks && (
        <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-lg text-sm text-amber-900 flex items-start gap-2">
          <MessageSquare size={16} className="mt-0.5 text-amber-500 shrink-0"/>
          <div>
            <span className="font-semibold block mb-0.5">Response from Owner:</span>
            {complaint.ownerRemarks}
          </div>
        </div>
      )}

      {role === "tenant" && complaint.status === "pending" && (
        <div className="mt-4 text-right">
          <button
            onClick={() => onDelete(complaint._id)}
            className="rounded-lg bg-red-50 text-red-600 px-4 py-2 text-sm font-medium hover:bg-red-100 transition"
          >
            Cancel Complaint
          </button>
        </div>
      )}
    </div>
  );
};

export default ComplaintCard;
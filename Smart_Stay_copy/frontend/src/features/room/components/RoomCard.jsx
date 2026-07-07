import { Link } from "react-router-dom";
import { Edit, Trash2, Users, Home, ShieldCheck, User, Wrench, AlertCircle, CircleAlert, FileText, CheckCircle2 } from "lucide-react";
import { useSelector } from "react-redux";
import clsx from "clsx";

const RoomCard = ({ room, propertyId, onDelete }) => {
  const { user } = useSelector((state) => state.auth);
  
  const isOwnerAdmin = user?.role === "admin" || user?.role === "owner";

  
  const isOccupied = Math.random() > 0.4;
  const complaintCount = isOccupied ? Math.floor(Math.random() * 3) : 0;
  const hasMaintenance = Math.random() > 0.8;
  const leaseExpiry = isOccupied ? "Exp: Oct 2026" : null;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 flex flex-col h-full hover:shadow-md transition-all group">
      
      {}
      <div className="relative h-40 w-full overflow-hidden bg-slate-100">
        <img
          src={
            room.images?.length
              ? room.images[0].secure_url
              : "https://placehold.co/600x400?text=Room"
          }
          alt={`Room ${room.roomNumber}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        {isOwnerAdmin && (
          <div className="absolute top-3 right-3 flex gap-2">
            <span className={clsx("px-2.5 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1.5", 
              isOccupied ? "bg-indigo-100 text-indigo-700" : "bg-green-100 text-green-700"
            )}>
              <span className={clsx("w-1.5 h-1.5 rounded-full", isOccupied ? "bg-indigo-500" : "bg-green-500")}></span>
              {isOccupied ? "Occupied" : "Vacant"}
            </span>
          </div>
        )}

        <div className="absolute bottom-3 left-4 text-white">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold drop-shadow-md">
              Room {room.roomNumber}
            </h2>
            <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-xs font-medium border border-white/30">
              {room.roomType}
            </span>
          </div>
          <p className="text-sm text-slate-200 mt-0.5 font-medium flex items-center gap-1">
            <Home size={14} /> Floor {room.floor}
          </p>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        {}
        {isOwnerAdmin ? (
          <div className="mb-5 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div>
                <p className="text-xs font-medium text-slate-500">Monthly Rent</p>
                <p className="text-lg font-bold text-green-600">,1{room.rent}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-slate-500">Capacity</p>
                <p className="text-slate-900 font-semibold flex items-center justify-end gap-1"><Users size={14}/> {room.capacity}</p>
              </div>
            </div>
            
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 flex items-center gap-1.5"><User size={14}/> Tenant</span>
                {isOccupied ? <span className="font-medium text-slate-900">John Doe</span> : <span className="text-slate-400 italic">None</span>}
              </div>
              {isOccupied && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 flex items-center gap-1.5"><FileText size={14}/> Lease</span>
                  <span className="font-medium text-slate-700">{leaseExpiry}</span>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              {complaintCount > 0 ? (
                 <div className="flex-1 bg-orange-50 border border-orange-100 p-2 rounded-lg flex items-center justify-center gap-1.5 text-xs font-medium text-orange-700">
                   <AlertCircle size={14}/> {complaintCount} Complaints
                 </div>
              ) : (
                <div className="flex-1 bg-slate-50 border border-slate-100 p-2 rounded-lg flex items-center justify-center gap-1.5 text-xs font-medium text-slate-500">
                  <CheckCircle2 size={14}/> 0 Complaints
                </div>
              )}
              {hasMaintenance && (
                <div className="flex-1 bg-red-50 border border-red-100 p-2 rounded-lg flex items-center justify-center gap-1.5 text-xs font-medium text-red-700">
                  <Wrench size={14}/> Maintenance
                </div>
              )}
            </div>
          </div>
        ) : (
                    <div className="mb-5 space-y-4">
             <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500">Rent per month</p>
                <p className="text-2xl font-bold text-green-600">,1{room.rent}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-slate-500">Capacity</p>
                <p className="text-slate-900 font-semibold flex items-center justify-end gap-1"><Users size={16}/> {room.capacity}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 text-xs">
              {room.hasAC && <span className="rounded bg-indigo-50 border border-indigo-100 px-2.5 py-1 text-indigo-700 font-medium">AC</span>}
              {room.attachedBathroom && <span className="rounded bg-indigo-50 border border-indigo-100 px-2.5 py-1 text-indigo-700 font-medium">Attached Bath</span>}
              {room.furnished && <span className="rounded bg-indigo-50 border border-indigo-100 px-2.5 py-1 text-indigo-700 font-medium">Furnished</span>}
              {room.wifiAvailable && <span className="rounded bg-indigo-50 border border-indigo-100 px-2.5 py-1 text-indigo-700 font-medium">WiFi</span>}
            </div>
          </div>
        )}

        {}
        <div className="flex gap-2 mt-auto pt-4 border-t border-slate-100">
          {user?.role === "tenant" && (
            <Link
              to={`/dashboard/properties/${propertyId}/rooms/${room._id}/book`}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition shadow-sm"
            >
              Book Room
            </Link>
          )}

          {isOwnerAdmin && (
            <>
              <Link
                to={`/dashboard/rooms/${room._id}/edit`}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-slate-100 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition"
              >
                <Edit size={16} /> Edit
              </Link>

              <button
                onClick={() => onDelete(room._id)}
                className="flex items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-red-600 hover:bg-red-100 transition border border-red-100"
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
import { Link } from "react-router-dom";
import { 
  Edit, 
  Trash2, 
  MapPin, 
  BedDouble, 
  TrendingUp, 
  AlertTriangle,
  Users,
  BarChart2,
  ChevronRight
} from "lucide-react";
import { useSelector } from "react-redux";

const PropertyCard = ({
  property,
  onDelete,
  isOwner = false 
}) => {
  const { user } = useSelector((state) => state.auth);
  
  const hasAccess = user?.role === "admin" || user?._id === property.owner?._id || user?._id === property.owner;

  
  const occupancy = property.availableBeds ? Math.round(((property.totalBeds - property.availableBeds) / property.totalBeds) * 100) : 85;
  const mockRevenue = (property.totalRooms || 10) * 1200;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 flex flex-col h-full hover:shadow-md transition-shadow">
      {}
      <div className="relative h-48 w-full group">
        <img
          src={
            property.images?.length
              ? property.images[0].secure_url
              : "https://placehold.co/600x400?text=No+Image"
          }
          alt={property.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {isOwner && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-sm flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Active
          </div>
        )}

        <div className="absolute bottom-3 left-4 right-4 text-white">
          <h2 className="text-xl font-bold truncate drop-shadow-md">
            {property.name}
          </h2>
          <div className="mt-1 flex items-center gap-1.5 text-slate-200 text-sm font-medium">
            <MapPin size={14} />
            <span className="truncate">{property.city}, {property.state}</span>
          </div>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        {}
        {isOwner ? (
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <p className="text-xs font-medium text-slate-500 mb-1 flex items-center gap-1"><Activity size={12}/> Occupancy</p>
              <div className="flex items-end gap-2">
                <span className="text-xl font-bold text-slate-900">{occupancy}%</span>
                <div className="w-full bg-slate-200 rounded-full h-1.5 mb-1.5">
                  <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${occupancy}%` }}></div>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <p className="text-xs font-medium text-slate-500 mb-1 flex items-center gap-1"><TrendingUp size={12}/> Est. Revenue</p>
              <p className="text-xl font-bold text-green-600">,1{(mockRevenue/1000).toFixed(1)}k</p>
            </div>
          </div>
        ) : (
          <p className="line-clamp-2 text-slate-600 text-sm mb-5 flex-1">
            {property.description}
          </p>
        )}

        {}
        <div className="flex justify-between items-center py-3 border-y border-slate-100 mb-4">
          <div className="text-center">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Rooms</p>
            <p className="font-bold text-slate-900 mt-0.5 flex items-center justify-center gap-1">
               {property.totalRooms}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Beds</p>
            <p className="font-bold text-slate-900 mt-0.5 flex items-center justify-center gap-1">
              {property.totalBeds}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Available</p>
            <p className="font-bold text-green-600 mt-0.5">
              {property.availableBeds}
            </p>
          </div>
        </div>

        {}
        {isOwner ? (
          <div className="grid grid-cols-2 gap-2 mt-auto">
            <Link to={`/dashboard/properties/${property._id}`} className="bg-indigo-50 text-indigo-700 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-1 hover:bg-indigo-100 transition">
              <BedDouble size={16}/> Rooms
            </Link>
            <Link to={`/dashboard/properties/${property._id}`} className="bg-indigo-50 text-indigo-700 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-1 hover:bg-indigo-100 transition">
              <Users size={16}/> Tenants
            </Link>
            <button className="bg-slate-50 text-slate-600 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-1 hover:bg-slate-100 transition col-span-2">
              <BarChart2 size={16}/> View Analytics
            </button>
          </div>
        ) : (
          <div className="flex gap-2 mt-auto">
            <Link
              to={`/dashboard/properties/${property._id}`}
              className="flex-1 rounded-xl bg-indigo-600 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-indigo-700 shadow-sm flex items-center justify-center gap-1"
            >
              View Property <ChevronRight size={16}/>
            </Link>

            {hasAccess && (
              <>
                <Link
                  to={`/dashboard/properties/${property._id}/edit`}
                  className="rounded-xl bg-slate-100 p-2.5 text-slate-600 transition hover:bg-slate-200 border border-slate-200"
                >
                  <Edit size={18} />
                </Link>

                <button
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(property._id); }}
                  className="rounded-xl bg-red-50 p-2.5 text-red-600 transition hover:bg-red-100 border border-red-100"
                >
                  <Trash2 size={18} />
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};


const Activity = ({size}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
)

export default PropertyCard;
import {
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const StatsCard = ({
  title,
  value,
  icon: Icon,
  color = "bg-indigo-600",
  change,
  changeType = "increase",
}) => {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        {}
        <div>
          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-800">
            {value}
          </h2>

          {change !== undefined && (
            <div
              className={`mt-3 flex items-center gap-1 text-sm ${
                changeType === "increase"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {changeType === "increase" ? (
                <ArrowUpRight size={16} />
              ) : (
                <ArrowDownRight size={16} />
              )}

              <span>{change}%</span>
            </div>
          )}
        </div>

        {}
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-xl ${color}`}
        >
          {Icon && (
            <Icon
              className="text-white"
              size={28}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
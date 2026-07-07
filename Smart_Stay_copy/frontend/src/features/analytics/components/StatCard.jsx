const StatCard = ({
  title,
  value,
  subtitle = "",
}) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
      <h3 className="text-sm font-medium text-slate-500">
        {title}
      </h3>

      <h2 className="mt-3 text-3xl font-bold text-slate-800">
        {value}
      </h2>

      {subtitle && (
        <p className="mt-2 text-sm text-slate-500">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default StatCard;
const EmptyState = ({
  title = "No Data Found",
  message = "Nothing to display here yet.",
  className = "",
}) => {
  return (
    <div
      className={`rounded-xl border border-dashed border-slate-300 py-20 text-center ${className}`}
    >
      <h2 className="text-xl font-semibold text-slate-700">
        {title}
      </h2>

      <p className="mt-2 text-slate-500">
        {message}
      </p>
    </div>
  );
};

export default EmptyState;

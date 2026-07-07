const PropertyFilters = ({
  filters = {},
  onChange,
}) => {
  return (
    <div className="flex flex-wrap gap-4">
      <input
        type="text"
        placeholder="Search by city..."
        value={filters.city || ""}
        onChange={(e) => onChange?.({ ...filters, city: e.target.value })}
        className="rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none"
      />

      <select
        value={filters.gender || ""}
        onChange={(e) => onChange?.({ ...filters, gender: e.target.value })}
        className="rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none"
      >
        <option value="">All Types</option>
        <option value="male">Boys</option>
        <option value="female">Girls</option>
        <option value="co-ed">Co-Ed</option>
      </select>
    </div>
  );
};

export default PropertyFilters;

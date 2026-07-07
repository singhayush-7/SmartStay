const Table = ({ columns = [], data = [], className = "" }) => {
  return (
    <div className={`overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm ${className}`}>
      <table className="min-w-full">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-6 py-3 text-left text-sm font-semibold text-slate-700"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-10 text-center text-slate-500"
              >
                No data available.
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={index} className="border-t border-slate-100 hover:bg-slate-50 transition">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-6 py-4 text-sm text-slate-700"
                  >
                    {col.render ? col.render(row) : row[col.key] ?? "-"}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

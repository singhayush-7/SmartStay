const AnalyticsTable = ({
  title,
  columns = [],
  data = [],
}) => {
  return (
    <div className="rounded-xl bg-white shadow border border-slate-200 overflow-hidden">
      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold">
          {title}
        </h2>
      </div>

      {data.length === 0 ? (
        <div className="p-6 text-center text-slate-500">
          No data available.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-100">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="px-6 py-3 text-left text-sm font-semibold text-slate-700"
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.map((row, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-slate-50"
                >
                  {columns.map((column) => (
                  <td
  key={column.key}
  className="px-6 py-4 text-sm text-slate-700"
>
  {column.render
    ? column.render(row)
    : row[column.key] ?? "-"}
</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AnalyticsTable;
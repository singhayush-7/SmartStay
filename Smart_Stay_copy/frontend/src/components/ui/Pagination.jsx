const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 py-4">
      <button
        onClick={() => onPageChange?.(currentPage - 1)}
        disabled={currentPage <= 1}
        className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium disabled:opacity-50 hover:bg-slate-100 transition"
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange?.(page)}
          className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
            page === currentPage
              ? "bg-indigo-600 text-white"
              : "border border-slate-300 hover:bg-slate-100"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange?.(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium disabled:opacity-50 hover:bg-slate-100 transition"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

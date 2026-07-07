const variants = {
  primary:
    "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-300",

  secondary:
    "bg-slate-600 text-white hover:bg-slate-700 focus:ring-slate-300",

  danger:
    "bg-red-600 text-white hover:bg-red-700 focus:ring-red-300",

  outline:
    "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 focus:ring-slate-300",
};

const sizes = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2.5 text-sm",
  lg: "px-5 py-3 text-base",
};

const Button = ({
  children,
  type = "button",
  onClick,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className = "",
}) => {
  const isDisabled = loading || disabled;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        inline-flex
        items-center
        justify-center
        rounded-lg
        font-medium
        transition-all
        duration-200
        focus:outline-none
        focus:ring-2
        disabled:opacity-60
        disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg
            className="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              opacity="0.25"
            />
            <path
              d="M22 12a10 10 0 0 1-10 10"
              stroke="currentColor"
              strokeWidth="4"
            />
          </svg>

          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
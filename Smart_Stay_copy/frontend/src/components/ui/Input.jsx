const Input = ({
  label,
  name,
  type = "text",
  placeholder = "",
  register,
  rules = {},
  error,
  disabled = false,
  autoComplete = "off",
  className = "",
  // Controlled input props (when register is not used)
  value,
  onChange,
  required,
}) => {
  // If register (react-hook-form) is provided, use it.
  // Otherwise fall back to plain controlled props.
  const inputProps = register
    ? { ...register(name, rules) }
    : { name, value: value ?? "", onChange, required };

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}

      <input
        id={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        {...inputProps}
        className={`
          w-full
          rounded-lg
          border
          px-4
          py-3
          text-sm
          transition-all
          duration-200
          bg-white
          ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-slate-300 focus:border-indigo-500"
          }
          focus:outline-none
          focus:ring-2
          ${
            error
              ? "focus:ring-red-200"
              : "focus:ring-indigo-200"
          }
          disabled:bg-slate-100
          disabled:cursor-not-allowed
          ${className}
        `}
      />

      {error && (
        <p className="text-sm text-red-500">
          {typeof error === "string" ? error : error.message}
        </p>
      )}
    </div>
  );
};

export default Input;
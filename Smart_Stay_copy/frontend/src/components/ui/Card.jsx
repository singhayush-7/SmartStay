const Card = ({
  children,
  className = "",
  shadow = "md",
  padding = "md",
}) => {
  const shadows = {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
    none: "",
  };

  const paddings = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    none: "",
  };

  return (
    <div
      className={`
        bg-white
        rounded-xl
        border
        border-slate-200
        ${shadows[shadow]}
        ${paddings[padding]}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
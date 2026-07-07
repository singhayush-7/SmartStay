import { useEffect } from "react";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  className = "",
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div
        className={`w-full max-w-lg rounded-xl bg-white shadow-xl ${className}`}
      >
        {title && (
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h2 className="text-xl font-semibold">{title}</h2>

            <button
              onClick={onClose}
              className="rounded-lg p-2 hover:bg-slate-100"
            >
              ✕
            </button>
          </div>
        )}

        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

import Button from "../ui/Button";

const ConfirmModal = ({
  isOpen,
  title = "Confirm Action",
  message = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
  onConfirm,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold">
            {title}
          </h2>
        </div>

        <div className="px-6 py-5">
          <p className="text-slate-600">
            {message}
          </p>
        </div>

        <div className="flex justify-end gap-3 border-t px-6 py-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
          >
            {cancelText}
          </Button>

          <Button
            type="button"
            loading={loading}
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
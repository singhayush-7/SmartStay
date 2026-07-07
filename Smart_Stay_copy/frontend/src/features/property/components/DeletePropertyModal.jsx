import ConfirmModal from "../../../components/common/ConfirmModal";

const DeletePropertyModal = ({
  isOpen,
  loading,
  onClose,
  onConfirm,
}) => {
  return (
    <ConfirmModal
      isOpen={isOpen}
      title="Delete Property"
      message="Are you sure you want to delete this property? This action cannot be undone."
      confirmText="Delete"
      loading={loading}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
};

export default DeletePropertyModal;

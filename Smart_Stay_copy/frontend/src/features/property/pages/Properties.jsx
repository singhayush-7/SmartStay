import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Plus } from "lucide-react";

import PropertyCard from "../components/PropertyCard";
import ConfirmModal from "../../../components/common/ConfirmModal";
import Button from "../../../components/ui/Button";
import { useProperty } from "../hooks/useProperty";

const Properties = () => {
  const { properties, loading } = useSelector(
    (state) => state.property
  );

  const { user } = useSelector(
    (state) => state.auth
  );

  const {
    fetchProperties,
    fetchMyProperties,
    removeExistingProperty,
  } = useProperty();

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [selectedPropertyId, setSelectedPropertyId] =
    useState(null);

  useEffect(() => {
    if (!user) return;

    if (user.role === "admin" || user.role === "tenant") {
      fetchProperties();
    } else {
      fetchMyProperties();
    }
  }, [user]);
  const openDeleteModal = (id) => {
    setSelectedPropertyId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    await removeExistingProperty(selectedPropertyId);

    setShowDeleteModal(false);
    setSelectedPropertyId(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        Loading properties...
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8">
        {}

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold">
              Properties
            </h1>

            <p className="mt-2 text-slate-500">
              Manage all your properties.
            </p>
          </div>

          {(user?.role === "owner" ||
            user?.role === "admin") && (
            <Link to="/dashboard/properties/create">
              <Button>
                <Plus
                  size={18}
                  className="mr-2"
                />
                Add Property
              </Button>
            </Link>
          )}
        </div>

        {}

        {properties.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 py-20 text-center">
            <h2 className="text-xl font-semibold">
              No Properties Found
            </h2>

            <p className="mt-2 text-slate-500">
              Start by adding your first property.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
                onDelete={openDeleteModal}
              />
            ))}
          </div>
        )}
      </div>

      {}

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Property"
        message="Are you sure you want to delete this property? This action cannot be undone."
        confirmText="Delete"
        loading={loading}
        onClose={() =>
          setShowDeleteModal(false)
        }
        onConfirm={handleDelete}
      />
    </>
  );
};

export default Properties;
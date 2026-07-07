import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import PropertyForm from "../components/PropertyForm";
import { useProperty } from "../hooks/useProperty";

const EditProperty = () => {
  const { id } = useParams();

  const {
    fetchPropertyById,
    editProperty,
  } = useProperty();

  const {
    selectedProperty,
    loading,
  } = useSelector(
    (state) => state.property
  );

  useEffect(() => {
    fetchPropertyById(id);
  }, [id]);

  const handleSubmit = async (data) => {
    await editProperty(id, data);
  };

  if (loading || !selectedProperty) {
    return (
      <div className="flex justify-center py-20">
        Loading property...
      </div>
    );
  }

  return (
    <div className="p-6">
      <PropertyForm
        defaultValues={selectedProperty}
        onSubmit={handleSubmit}
        isEdit={true}
      />
    </div>
  );
};

export default EditProperty;
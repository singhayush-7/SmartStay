import { useProperty } from "../hooks/useProperty";
import PropertyForm from "../components/PropertyForm";

const CreateProperty = () => {
  const { createNewProperty } = useProperty();

  const handleSubmit = async (data) => {
    await createNewProperty(data);
  };

  return (
    <div className="p-6">
      <PropertyForm
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CreateProperty;
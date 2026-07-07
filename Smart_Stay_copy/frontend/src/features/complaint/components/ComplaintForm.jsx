import { useState } from "react";

import Button from "../../../components/ui/Button";

const categories = [
  { label: "Electricity", value: "electricity" },
  { label: "Water", value: "water" },
  { label: "WiFi", value: "wifi" },
  { label: "Cleaning", value: "cleaning" },
  { label: "Food", value: "food" },
  { label: "Maintenance", value: "maintenance" },
  { label: "Security", value: "security" },
  { label: "Other", value: "other" },
];

const priorities = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
  { label: "Urgent", value: "urgent" },
];

const ComplaintForm = ({
  properties = [],
  rooms = [],
  onSubmit,
  loading,
}) => {
  const [formData, setFormData] = useState({
    property: "",
    room: "",
    category: "",
    title: "",
    description: "",
    priority: "medium",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const filteredRooms = rooms.filter(
    (room) => room.property === formData.property
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);

    setFormData({
      property: "",
      room: "",
      category: "",
      title: "",
      description: "",
      priority: "medium",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl bg-white p-6 shadow-md space-y-5"
    >
      <h2 className="text-2xl font-semibold">
        Raise Complaint
      </h2>

      {}

      <div>
        <label className="mb-2 block font-medium">
          Property
        </label>

        <select
          name="property"
          value={formData.property}
          onChange={handleChange}
          required
          className="w-full rounded-lg border p-3"
        >
          <option value="">
            Select Property
          </option>

          {properties.map((property) => (
            <option
              key={property._id}
              value={property._id}
            >
              {property.name}
            </option>
          ))}
        </select>
      </div>

      {/* Room */}

      <div>
        <label className="mb-2 block font-medium">
          Room
        </label>

        <select
          name="room"
          value={formData.room}
          onChange={handleChange}
          required
          className="w-full rounded-lg border p-3"
        >
          <option value="">
            Select Room
          </option>

          {filteredRooms.map((room) => (
            <option
              key={room._id}
              value={room._id}
            >
              Room {room.roomNumber}
            </option>
          ))}
        </select>
      </div>

      {/* Category */}

      <div>
        <label className="mb-2 block font-medium">
          Category
        </label>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full rounded-lg border p-3"
        >
          <option value="">
            Select Category
          </option>

          {categories.map((category) => (
            <option
              key={category.value}
              value={category.value}
            >
              {category.label}
            </option>
          ))}
        </select>
      </div>

      {/* Priority */}

      <div>
        <label className="mb-2 block font-medium">
          Priority
        </label>

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
        >
          {priorities.map((priority) => (
            <option
              key={priority.value}
              value={priority.value}
            >
              {priority.label}
            </option>
          ))}
        </select>
      </div>

      {}

      <div>
        <label className="mb-2 block font-medium">
          Complaint Title
        </label>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Enter complaint title"
          className="w-full rounded-lg border border-slate-300 p-3 focus:border-indigo-500 focus:outline-none"
        />
      </div>

      {}

      <div>
        <label className="mb-2 block font-medium">
          Description
        </label>

        <textarea
          rows={5}
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full rounded-lg border p-3"
          placeholder="Describe the issue..."
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading
          ? "Submitting..."
          : "Submit Complaint"}
      </Button>
    </form>
  );
};

export default ComplaintForm;
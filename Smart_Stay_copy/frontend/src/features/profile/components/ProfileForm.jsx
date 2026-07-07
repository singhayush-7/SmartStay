import { useEffect, useState } from "react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import ImageUploader from "../../../components/common/ImageUploader";

const ProfileForm = ({
  user,
  onSubmit,
  loading,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [avatar, setAvatar] = useState([]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      });

      if (user.avatar?.secure_url) {
        setAvatar([
          {
            preview: user.avatar.secure_url,
          },
        ]);
      }
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitData = new FormData();

    submitData.append("name", formData.name);
    submitData.append("phone", formData.phone);
    submitData.append("address", formData.address);

    
    submitData.append("email", formData.email);

    if (avatar.length > 0 && avatar[0].file) {
      submitData.append("avatar", avatar[0].file);
    }

    onSubmit(submitData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border bg-white p-6 shadow-sm"
    >
      {}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Profile Picture
        </label>

        <ImageUploader
          images={avatar}
          setImages={setAvatar}
          maxImages={1}
        />
      </div>

      {}

      <Input
        label="Full Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      {}

      <Input
        label="Email"
        name="email"
        value={formData.email}
        disabled
      />

      {}

      <Input
        label="Phone Number"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
      />

      {}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Address
        </label>

        <textarea
          name="address"
          rows={4}
          value={formData.address}
          onChange={handleChange}
          className="w-full rounded-lg border p-3 outline-none focus:border-indigo-500"
        />
      </div>

      {}

      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading
          ? "Updating..."
          : "Update Profile"}
      </Button>
    </form>
  );
};

export default ProfileForm;
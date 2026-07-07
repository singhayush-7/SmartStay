import { useState } from "react";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

const ChangePasswordForm = ({
  onSubmit,
  loading,
}) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword =
        "Current password is required.";
    }

    if (!formData.newPassword) {
      newErrors.newPassword =
        "New password is required.";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword =
        "Password must be at least 6 characters.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your password.";
    } else if (
      formData.newPassword !== formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit({
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    });

    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border bg-white p-6 shadow-sm"
    >
      <h2 className="text-xl font-semibold">
        Change Password
      </h2>

      <Input
        label="Current Password"
        type="password"
        name="currentPassword"
        value={formData.currentPassword}
        onChange={handleChange}
        error={errors.currentPassword}
      />

      <Input
        label="New Password"
        type="password"
        name="newPassword"
        value={formData.newPassword}
        onChange={handleChange}
        error={errors.newPassword}
      />

      <Input
        label="Confirm New Password"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
      />

      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading
          ? "Updating Password..."
          : "Change Password"}
      </Button>
    </form>
  );
};

export default ChangePasswordForm;
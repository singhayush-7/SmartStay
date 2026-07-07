import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import { useAuth } from "../hooks/useAuth";

const ResetPasswordForm = () => {
  const { token } = useParams();
  const { resetPassword } = useAuth();
  const { loading } = useSelector((state) => state.auth);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { password: "", confirmPassword: "" },
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    await resetPassword(token, data.password);
  };

  return (
    <Card className="w-full max-w-md">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Reset Password</h2>
        <p className="text-slate-500 mt-2">
          Create a new strong password for your account.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="New Password"
          name="password"
          type="password"
          placeholder="Enter new password"
          register={register}
          error={errors.password}
          rules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          }}
        />

        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="Confirm new password"
          register={register}
          error={errors.confirmPassword}
          rules={{
            required: "Please confirm your password",
            validate: (value) =>
              value === password || "Passwords do not match",
          }}
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
      </form>

      <div className="flex justify-center items-center mt-6 text-sm">
        <Link to="/login" className="text-indigo-600 hover:underline">
          Back to Login
        </Link>
      </div>
    </Card>
  );
};

const ResetPassword = () => {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-center items-center bg-indigo-600 text-white p-12">
        <h1 className="text-5xl font-bold mb-6">SmartStay</h1>
        <p className="text-xl text-center max-w-md leading-relaxed">
          Manage your properties, rooms, bookings and tenants from one modern dashboard.
        </p>
      </div>
      <div className="flex items-center justify-center bg-slate-100 px-6 py-10">
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPassword;
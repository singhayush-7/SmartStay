import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import { useAuth } from "../hooks/useAuth";

const ForgotPasswordForm = () => {
  const { forgotPassword } = useAuth();
  const { loading } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "" },
  });

  const onSubmit = async (data) => {
    await forgotPassword(data.email);
  };

  return (
    <Card className="w-full max-w-md">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Forgot Password</h2>
        <p className="text-slate-500 mt-2">
          Enter your email to receive a password reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          register={register}
          error={errors.email}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          }}
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
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

const ForgotPassword = () => {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-center items-center bg-indigo-600 text-white p-12">
        <h1 className="text-5xl font-bold mb-6">SmartStay</h1>
        <p className="text-xl text-center max-w-md leading-relaxed">
          Manage your properties, rooms, bookings and tenants from one modern dashboard.
        </p>
      </div>
      <div className="flex items-center justify-center bg-slate-100 px-6 py-10">
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPassword;
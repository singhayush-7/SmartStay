import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import { useAuth } from "../hooks/useAuth";

const RegisterForm = () => {
  const { register: registerUser } = useAuth();
  const { loading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role: "tenant",
    },
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    const { confirmPassword, ...userData } = data;
    await registerUser(userData);
  };

  return (
    <Card className="w-full max-w-md">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">
          Create Account
        </h2>

        <p className="text-slate-500 mt-2">
          Register to get started with SmartStay
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Full Name"
          name="name"
          placeholder="Enter your full name"
          register={register}
          error={errors.name}
          rules={{ required: "Name is required" }}
        />

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

        <Input
          label="Phone"
          name="phone"
          type="tel"
          placeholder="Enter your phone number"
          register={register}
          error={errors.phone}
          rules={{ required: "Phone is required" }}
        />

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Role
          </label>
          <select
            {...register("role")}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none"
          >
            <option value="tenant">Tenant</option>
            <option value="owner">Property Owner</option>
          </select>
        </div>

        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Create a password"
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
          placeholder="Confirm your password"
          register={register}
          error={errors.confirmPassword}
          rules={{
            required: "Please confirm your password",
            validate: (value) =>
              value === password || "Passwords do not match",
          }}
        />

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Creating Account..." : "Register"}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm">
        <Link to="/login" className="text-indigo-600 hover:underline">
          Already have an account? Login
        </Link>
      </div>
    </Card>
  );
};

export default RegisterForm;

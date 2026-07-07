import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";

import { useAuth } from "../hooks/useAuth";

const LoginForm = () => {
  const { login } = useAuth();

  const { loading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    await login(data);
  };

  return (
    <Card className="w-full max-w-md">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">
          Welcome Back
        </h2>

        <p className="text-slate-500 mt-2">
          Login to continue to SmartStay
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
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
              value:
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          }}
        />

        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          register={register}
          error={errors.password}
          rules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message:
                "Password must be at least 6 characters",
            },
          }}
        />

        <Button
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>

      <div className="flex justify-between items-center mt-6 text-sm">
        <Link
          to="/forgot-password"
          className="text-indigo-600 hover:underline"
        >
          Forgot Password?
        </Link>

        <Link
          to="/register"
          className="text-indigo-600 hover:underline"
        >
          Register
        </Link>
      </div>
    </Card>
  );
};

export default LoginForm;
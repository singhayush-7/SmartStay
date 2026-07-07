import RegisterForm from "../components/RegisterForm";

const Register = () => {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {}
      <div className="hidden lg:flex flex-col justify-center items-center bg-indigo-600 text-white p-12">
        <h1 className="text-5xl font-bold mb-6">
          SmartStay
        </h1>

        <p className="text-xl text-center max-w-md leading-relaxed">
          Manage your properties, rooms, bookings and tenants
          from one modern dashboard.
        </p>
      </div>

      {}
      <div className="flex items-center justify-center bg-slate-100 px-6 py-10">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
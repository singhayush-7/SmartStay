import PaymentCard from "./PaymentCard";

const PaymentList = ({
  payments = [],
  role,
  onPay,
  onDelete,
}) => {
  if (!payments.length) {
    return (
      <div className="rounded-xl bg-white p-10 text-center shadow">
        <h2 className="text-xl font-semibold text-slate-700">
          No Payments Found
        </h2>

        <p className="mt-2 text-slate-500">
          No payment records are available.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {payments.map((payment) => (
        <PaymentCard
          key={payment._id}
          payment={payment}
          role={role}
          onPay={onPay}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default PaymentList;
import { useEffect } from "react";

import { useAnalytics } from "../hooks/useAnalytics";

import StatCard from "../components/StatCard";
import AnalyticsTable from "../components/AnalyticsTable";

const Analytics = () => {
  const {
    loading,
    revenue,
    occupancy,
    bookings,
    payments,
    complaints,
    maintenance,

    fetchAllAnalytics,
  } = useAnalytics();

  useEffect(() => {
    fetchAllAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <h2 className="text-xl font-semibold">
          Loading Analytics...
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {}

      <div>
        <h1 className="text-3xl font-bold">
          Analytics Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Overview of your property business.
        </p>
      </div>

      {}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Rooms"
          value={occupancy?.totalRooms || 0}
        />

        <StatCard
          title="Occupied Rooms"
          value={occupancy?.occupiedRooms || 0}
        />

        <StatCard
          title="Vacant Rooms"
          value={occupancy?.vacantRooms || 0}
        />

        <StatCard
          title="Occupancy Rate"
          value={`${occupancy?.occupancyRate || 0}%`}
        />
      </div>

      {}

      <AnalyticsTable
        title="Monthly Revenue"
        columns={[
          {
            label: "Year",
            key: "year",
            render: (row) => row._id.year,
          },
          {
            label: "Month",
            key: "month",
            render: (row) => row._id.month,
          },
          {
            label: "Revenue",
            key: "revenue",
            render: (row) =>
              `₹${row.totalRevenue}`,
          },
          {
            label: "Payments",
            key: "payments",
            render: (row) =>
              row.totalPayments,
          },
        ]}
        data={revenue}
      />

      {}

      <AnalyticsTable
        title="Booking Trends"
        columns={[
          {
            label: "Year",
            key: "year",
            render: (row) => row._id.year,
          },
          {
            label: "Month",
            key: "month",
            render: (row) => row._id.month,
          },
          {
            label: "Approved",
            key: "approved",
            render: (row) =>
              row.approvedBookings,
          },
          {
            label: "Pending",
            key: "pending",
            render: (row) =>
              row.pendingBookings,
          },
          {
            label: "Cancelled",
            key: "cancelled",
            render: (row) =>
              row.cancelledBookings,
          },
        ]}
        data={bookings}
      />

      {}

      <AnalyticsTable
        title="Payment Analytics"
        columns={[
          {
            label: "Status",
            key: "status",
            render: (row) => row._id,
          },
          {
            label: "Payments",
            key: "payments",
            render: (row) =>
              row.totalPayments,
          },
          {
            label: "Amount",
            key: "amount",
            render: (row) =>
              `₹${row.totalAmount}`,
          },
        ]}
        data={payments}
      />

      {}

      <AnalyticsTable
        title="Complaint Status"
        columns={[
          {
            label: "Status",
            key: "status",
            render: (row) => row._id,
          },
          {
            label: "Total",
            key: "total",
            render: (row) => row.total,
          },
        ]}
        data={complaints?.statusWise || []}
      />

      {}

      <AnalyticsTable
        title="Complaint Categories"
        columns={[
          {
            label: "Category",
            key: "category",
            render: (row) => row._id,
          },
          {
            label: "Total",
            key: "total",
            render: (row) => row.total,
          },
        ]}
        data={complaints?.categoryWise || []}
      />

      {}

      <AnalyticsTable
        title="Maintenance Status"
        columns={[
          {
            label: "Status",
            key: "status",
            render: (row) => row._id,
          },
          {
            label: "Total",
            key: "total",
            render: (row) => row.total,
          },
        ]}
        data={maintenance?.statusWise || []}
      />

      {}

      <AnalyticsTable
        title="Maintenance Priority"
        columns={[
          {
            label: "Priority",
            key: "priority",
            render: (row) => row._id,
          },
          {
            label: "Total",
            key: "total",
            render: (row) => row.total,
          },
        ]}
        data={maintenance?.priorityWise || []}
      />

      {}

      <AnalyticsTable
        title="Maintenance Categories"
        columns={[
          {
            label: "Category",
            key: "category",
            render: (row) => row._id,
          },
          {
            label: "Total",
            key: "total",
            render: (row) => row.total,
          },
        ]}
        data={maintenance?.categoryWise || []}
      />

      {}

      <AnalyticsTable
        title="Maintenance Cost"
        columns={[
          {
            label: "Estimated Cost",
            key: "estimated",
            render: (row) =>
              `₹${row.estimatedCost}`,
          },
          {
            label: "Actual Cost",
            key: "actual",
            render: (row) =>
              `₹${row.actualCost}`,
          },
        ]}
        data={maintenance?.totalCost || []}
      />
    </div>
  );
};

export default Analytics;
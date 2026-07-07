import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  MapPin,
  Wifi,
  Car,
  Utensils,
  BedDouble,
  Building2,
  Star,
  Edit,
} from "lucide-react";

import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import { useProperty } from "../hooks/useProperty";

const PropertyDetails = () => {
  const { id } = useParams();

  const { fetchPropertyById } = useProperty();

  const { selectedProperty, loading } = useSelector(
    (state) => state.property
  );

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchPropertyById(id);
  }, [id]);

  if (loading || !selectedProperty) {
    return (
      <div className="flex justify-center py-20">
        Loading property...
      </div>
    );
  }

  const property = selectedProperty;

  return (
    <div className="space-y-8">
      {}

      <Card className="overflow-hidden">
        {property.images?.length > 0 ? (
          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
            {property.images.map((image) => (
              <img
                key={image.public_id}
                src={image.secure_url}
                alt={property.name}
                className="h-64 w-full object-cover"
              />
            ))}
          </div>
        ) : (
          <img
            src="https://placehold.co/1200x500?text=No+Image"
            alt="No Property"
            className="w-full"
          />
        )}
      </Card>

      {}

      <div className="flex flex-col justify-between gap-4 lg:flex-row">
        <div>
          <h1 className="text-4xl font-bold">
            {property.name}
          </h1>

          <div className="mt-3 flex items-center gap-2 text-slate-600">
            <MapPin size={18} />

            <span>
              {property.address}, {property.city},{" "}
              {property.state}
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            to={`/dashboard/properties/${property._id}/rooms`}
          >
            <Button variant="outline">
              <BedDouble size={18} className="mr-2" />
              View Rooms
            </Button>
          </Link>

          {(user?.role === "admin" ||
            user?._id === property.owner?._id) && (
            <>
              <Link
                to={`/dashboard/properties/${property._id}/bookings`}
              >
                <Button variant="outline">
                  View Bookings
                </Button>
              </Link>
              <Link
                to={`/dashboard/properties/${property._id}/edit`}
              >
                <Button>
                  <Edit size={18} className="mr-2" />
                  Edit Property
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

      {}

      <Card>
        <h2 className="mb-4 text-xl font-semibold">
          Description
        </h2>

        <p className="leading-7 text-slate-600">
          {property.description}
        </p>
      </Card>

      {}

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <Card className="text-center">
          <Building2
            size={28}
            className="mx-auto mb-3"
          />

          <h3 className="text-2xl font-bold">
            {property.totalRooms}
          </h3>

          <p>Total Rooms</p>
        </Card>

        <Card className="text-center">
          <BedDouble
            size={28}
            className="mx-auto mb-3"
          />

          <h3 className="text-2xl font-bold">
            {property.totalBeds}
          </h3>

          <p>Total Beds</p>
        </Card>

        <Card className="text-center">
          <BedDouble
            size={28}
            className="mx-auto mb-3 text-green-600"
          />

          <h3 className="text-2xl font-bold">
            {property.availableBeds}
          </h3>

          <p>Available Beds</p>
        </Card>

        <Card className="text-center">
          <Star
            size={28}
            className="mx-auto mb-3 text-yellow-500"
          />

          <h3 className="text-2xl font-bold">
            {(property.averageRating ?? 0).toFixed(1)}
          </h3>

          <p>
            {property.totalReviews} Reviews
          </p>
        </Card>
      </div>

      {}

      <Card>
        <h2 className="mb-4 text-xl font-semibold">
          Amenities
        </h2>

        <div className="flex flex-wrap gap-3">
          {property.amenities?.length > 0 ? (
            property.amenities.map((amenity) => (
              <span
                key={amenity}
                className="rounded-full bg-indigo-100 px-4 py-2 text-indigo-700"
              >
                {amenity}
              </span>
            ))
          ) : (
            <p>No amenities added.</p>
          )}
        </div>
      </Card>

      {}

      <Card>
        <h2 className="mb-4 text-xl font-semibold">
          Facilities
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex items-center gap-3">
            <Wifi
              className={
                property.wifiAvailable
                  ? "text-green-600"
                  : "text-slate-400"
              }
            />

            <span>
              {property.wifiAvailable
                ? "WiFi Available"
                : "WiFi Not Available"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Utensils
              className={
                property.foodAvailable
                  ? "text-green-600"
                  : "text-slate-400"
              }
            />

            <span>
              {property.foodAvailable
                ? "Food Available"
                : "Food Not Available"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Car
              className={
                property.parkingAvailable
                  ? "text-green-600"
                  : "text-slate-400"
              }
            />

            <span>
              {property.parkingAvailable
                ? "Parking Available"
                : "Parking Not Available"}
            </span>
          </div>
        </div>
      </Card>

      {}

      <Card>
        <h2 className="mb-4 text-xl font-semibold">
          Owner Details
        </h2>

        <div className="space-y-2">
          <p>
            <strong>Name:</strong>{" "}
            {property.owner?.name}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {property.owner?.email}
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            {property.owner?.phone}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default PropertyDetails;
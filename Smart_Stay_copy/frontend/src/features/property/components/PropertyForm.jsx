import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import ImageUploader from "../../../components/common/ImageUploader";

const amenitiesList = [
  "AC",
  "WiFi",
  "Laundry",
  "Power Backup",
  "Gym",
  "Lift",
  "CCTV",
  "RO Water",
  "Housekeeping",
  "Security",
];

const PropertyForm = ({
  defaultValues = {},
  onSubmit,
  isEdit = false,
}) => {
  const { loading } = useSelector(
    (state) => state.property
  );

  const [images, setImages] = useState(
  defaultValues.images || []
);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      gender: "co-ed",
      amenities: [],
      foodAvailable: false,
      wifiAvailable: false,
      parkingAvailable: false,
      ...defaultValues,
    },
  });



  useEffect(() => {
    setValue("images", images);
  }, [images, setValue]);



  const selectedAmenities = watch("amenities");

  return (
    <Card className="mx-auto max-w-5xl">
      <h2 className="mb-8 text-3xl font-bold">
        {isEdit ? "Edit Property" : "Create Property"}
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <Input
          label="Property Name"
          name="name"
          register={register}
          error={errors.name}
          rules={{
            required: "Property name is required",
          }}
        />

        <div>
          <label className="mb-2 block font-medium">
            Description
          </label>

          <textarea
            rows={5}
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full rounded-lg border border-slate-300 p-3 focus:border-indigo-500 focus:outline-none"
          />

          {errors.description && (
            <p className="mt-1 text-sm text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        <Input
          label="Address"
          name="address"
          register={register}
          error={errors.address}
          rules={{
            required: "Address is required",
          }}
        />

        <div className="grid gap-5 md:grid-cols-3">
          <Input
            label="City"
            name="city"
            register={register}
            error={errors.city}
            rules={{
              required: "City is required",
            }}
          />

          <Input
            label="State"
            name="state"
            register={register}
            error={errors.state}
            rules={{
              required: "State is required",
            }}
          />

          <Input
            label="Pincode"
            name="pincode"
            register={register}
            error={errors.pincode}
            rules={{
              required: "Pincode is required",
            }}
          />
        </div>

        {}

        <div>
          <label className="mb-2 block font-medium">
            Property For
          </label>

          <select
            {...register("gender", {
              required: true,
            })}
            className="w-full rounded-lg border border-slate-300 p-3"
          >
            <option value="male">
              Boys
            </option>

            <option value="female">
              Girls
            </option>

            <option value="co-ed">
              Co-Ed
            </option>
          </select>
        </div>

        {}

        <div>
          <h3 className="mb-3 font-semibold">
            Amenities
          </h3>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {amenitiesList.map((amenity) => (
              <label
                key={amenity}
                className="flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  value={amenity}
                  {...register("amenities")}
                />

                {amenity}
              </label>
            ))}
          </div>
        </div>

        {}

        <div className="grid gap-4 md:grid-cols-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("foodAvailable")}
            />

            Food Available
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("wifiAvailable")}
            />

            WiFi Available
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register(
                "parkingAvailable"
              )}
            />

            Parking Available
          </label>
        </div>

        {}

        <div>
          <label className="mb-3 block font-medium">
            Property Images
          </label>

          <ImageUploader
            images={images}
            setImages={setImages}
          />
        </div>

        <Button
          type="submit"
          loading={loading}
          className="w-full"
        >
          {isEdit
            ? "Update Property"
            : "Create Property"}
        </Button>
      </form>
    </Card>
  );
};

export default PropertyForm;
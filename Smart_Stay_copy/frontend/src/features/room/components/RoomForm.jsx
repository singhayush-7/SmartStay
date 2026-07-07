import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import ImageUploader from "../../../components/common/ImageUploader";

const RoomForm = ({
  propertyId,
  defaultValues = {},
  onSubmit,
  isEdit = false,
}) => {
  const { loading } = useSelector(
    (state) => state.room
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
      property: propertyId,
      roomNumber: "",
      roomType: "single",
      capacity: 1,
      availableBeds: 1,
      rent: "",
      securityDeposit: 0,
      floor: 0,
      hasAC: false,
      attachedBathroom: false,
      furnished: true,
      wifiAvailable: true,
      ...defaultValues,
    },
  });

  const capacity = watch("capacity");
  const occupiedBeds = defaultValues.occupiedBeds || 0;

  
  useEffect(() => {
    const newAvailable = Math.max(0, capacity - occupiedBeds);
    setValue("availableBeds", newAvailable);
  }, [capacity, occupiedBeds, setValue]);



  useEffect(() => {
    setValue("images", images);
  }, [images, setValue]);

  const submitHandler = (data) => {
    onSubmit({
      ...data,
      property: propertyId,
      images,
    });
  };

  return (
    <Card className="mx-auto max-w-4xl">
      <h2 className="mb-8 text-3xl font-bold">
        {isEdit ? "Edit Room" : "Create Room"}
      </h2>

      <form
        onSubmit={handleSubmit(submitHandler)}
        className="space-y-6"
      >
        {}
        <div className="grid gap-5 md:grid-cols-2">
          <Input
            label="Room Number"
            name="roomNumber"
            register={register}
            error={errors.roomNumber}
            rules={{
              required: "Room number is required",
            }}
          />

          <div>
            <label className="mb-2 block font-medium">
              Room Type
            </label>

            <select
              {...register("roomType")}
              className="w-full rounded-lg border p-3"
            >
              <option value="single">Single</option>
              <option value="double">Double</option>
              <option value="triple">Triple</option>
              <option value="four-sharing">
                Four Sharing
              </option>
            </select>
          </div>
        </div>

        {}
        <div className="grid gap-5 md:grid-cols-2">
          <Input
            type="number"
            label="Capacity"
            name="capacity"
            register={register}
            error={errors.capacity}
            rules={{
              required: "Capacity is required",
              min: Math.max(1, occupiedBeds), 
            }}
          />

          <Input
            type="number"
            label="Available Beds"
            name="availableBeds"
            register={register}
            error={errors.availableBeds}
            disabled
          />
        </div>

        {}
        <div className="grid gap-5 md:grid-cols-2">
          <Input
            type="number"
            label="Monthly Rent"
            name="rent"
            register={register}
            error={errors.rent}
            rules={{
              required: "Rent is required",
            }}
          />

          <Input
            type="number"
            label="Security Deposit"
            name="securityDeposit"
            register={register}
          />
        </div>

        {}
        <Input
          type="number"
          label="Floor"
          name="floor"
          register={register}
          error={errors.floor}
          rules={{
            required: "Floor is required",
          }}
        />

        {}
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register("hasAC")} />
            Air Conditioner
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("attachedBathroom")}
            />
            Attached Bathroom
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("furnished")}
            />
            Furnished
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("wifiAvailable")}
            />
            WiFi Available
          </label>
        </div>

        {}
        <div>
          <label className="mb-3 block font-medium">
            Room Images
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
          {isEdit ? "Update Room" : "Create Room"}
        </Button>
      </form>
    </Card>
  );
};

export default RoomForm;
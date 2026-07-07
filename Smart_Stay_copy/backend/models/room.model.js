import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },

    roomNumber: {
      type: String,
      required: [true, "Room number is required"],
      trim: true,
    },

    roomType: {
      type: String,
      enum: ["single", "double", "triple", "four-sharing"],
      required: true,
    },

    capacity: {
      type: Number,
      required: true,
      min: 1,
    },

    occupiedBeds: {
      type: Number,
      default: 0,
      min: 0,
    },

    availableBeds: {
      type: Number,
      required: true,
      min: 0,
    },

    rent: {
      type: Number,
      required: true,
      min: 0,
    },

    securityDeposit: {
      type: Number,
      default: 0,
      min: 0,
    },

    floor: {
      type: Number,
      required: true,
      min: 0,
    },

    hasAC: {
      type: Boolean,
      default: false,
    },

    attachedBathroom: {
      type: Boolean,
      default: false,
    },

    furnished: {
      type: Boolean,
      default: true,
    },

    wifiAvailable: {
      type: Boolean,
      default: true,
    },

    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        secure_url: {
          type: String,
          required: true,
        },
      },
    ],

    status: {
      type: String,
      enum: ["available", "full", "maintenance"],
      default: "available",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);


roomSchema.index(
  {
    property: 1,
    roomNumber: 1,
  },
  {
    unique: true,
  }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;
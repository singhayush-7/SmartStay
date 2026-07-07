import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: [true, "Property name is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },

    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    pincode: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      latitude: {
        type: Number,
        default: null,
      },
      longitude: {
        type: Number,
        default: null,
      },
    },

    gender: {
      type: String,
      enum: ["male", "female", "co-ed"],
      required: true,
    },

    amenities: [
      {
        type: String,
      },
    ],

    foodAvailable: {
      type: Boolean,
      default: false,
    },

    wifiAvailable: {
      type: Boolean,
      default: false,
    },

    parkingAvailable: {
      type: Boolean,
      default: false,
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

   totalRooms: {
  type: Number,
  default: 0,
},

totalBeds: {
  type: Number,
  default: 0,
},

occupiedBeds: {
  type: Number,
  default: 0,
},

availableBeds: {
  type: Number,
  default: 0,
},

    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    totalReviews: {
      type: Number,
      default: 0,
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

const Property = mongoose.model("Property", propertySchema);

export default Property;
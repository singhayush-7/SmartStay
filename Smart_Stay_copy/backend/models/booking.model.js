import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },

    
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },

    
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    
    status: {
      type: String,
      enum: [
        "pending",
        "approved",
        "rejected",
        "cancelled",
        "completed",
      ],
      default: "pending",
    },

    
    checkInDate: {
      type: Date,
      required: true,
    },

    checkOutDate: {
      type: Date,
      required: true,
    },

    
    monthlyRent: {
      type: Number,
      required: true,
    },

    securityDeposit: {
      type: Number,
      required: true,
    },

    
    message: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },

    // Owner's reason for rejection
    rejectionReason: {
      type: String,
      trim: true,
      default: "",
    },

    // Future use (Phase 4)
    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },

    
    isCheckedIn: {
      type: Boolean,
      default: false,
    },

    isCheckedOut: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);


bookingSchema.index(
  {
    tenant: 1,
    room: 1,
  },
  {
    unique: true,
    partialFilterExpression: {
      status: {
        $in: ["pending", "approved"],
      },
    },
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
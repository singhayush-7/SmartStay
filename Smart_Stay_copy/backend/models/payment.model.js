import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },

    
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    
    owner: {
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

    
    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    
    securityDeposit: {
      type: Number,
      default: 0,
      min: 0,
    },

    
    rentMonth: {
      type: String,
      required: true,
      trim: true,
    },

    
    dueDate: {
      type: Date,
      required: true,
    },

    
    status: {
      type: String,
      enum: [
        "pending",
        "paid",
        "failed",
        "refunded",
      ],
      default: "pending",
    },

    
    paymentMethod: {
      type: String,
      enum: [
        "cash",
        "upi",
        "card",
        "netbanking",
        "razorpay",
      ],
      default: "upi",
    },

    
    transactionId: {
      type: String,
      trim: true,
      default: "",
    },

    // Invoice / Receipt number
    invoiceNumber: {
      type: String,
      unique: true,
      required: true,
    },

    // Payment completion time
    paidAt: {
      type: Date,
    },

    // Additional notes
    notes: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// One payment per booking per rent month
paymentSchema.index(
  {
    booking: 1,
    rentMonth: 1,
  },
  {
    unique: true,
  }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;6
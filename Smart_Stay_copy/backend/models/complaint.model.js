import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    
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

    
    category: {
      type: String,
      enum: [
        "electricity",
        "water",
        "wifi",
        "cleaning",
        "food",
        "maintenance",
        "security",
        "other",
      ],
      required: true,
    },

    
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },

    
    status: {
      type: String,
      enum: [
        "pending",
        "in-progress",
        "resolved",
        "closed",
      ],
      default: "pending",
    },

    
    priority: {
      type: String,
      enum: [
        "low",
        "medium",
        "high",
        "urgent",
      ],
      default: "medium",
    },

    
    resolution: {
      type: String,
      trim: true,
      default: "",
      maxlength: 1000,
    },

    // Resolution timestamp
    resolvedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Complaint = mongoose.model(
  "Complaint",
  complaintSchema
);

export default Complaint;
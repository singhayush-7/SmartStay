import mongoose from "mongoose";

const maintenanceSchema = new mongoose.Schema(
  {
    
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },

    
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      default: null,
    },

    
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    
    complaint: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Complaint",
      default: null,
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

    
    category: {
      type: String,
      enum: [
        "electrical",
        "plumbing",
        "cleaning",
        "painting",
        "internet",
        "furniture",
        "security",
        "other",
      ],
      default: "other",
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

    
    status: {
      type: String,
      enum: [
        "pending",
        "assigned",
        "in-progress",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },

    
    assignedTo: {
      type: String,
      trim: true,
      default: "",
    },

    // Estimated completion date
    expectedCompletionDate: {
      type: Date,
      default: null,
    },

    // Actual completion date
    completedAt: {
      type: Date,
      default: null,
    },

    // Estimated maintenance cost
    estimatedCost: {
      type: Number,
      min: 0,
      default: 0,
    },

    // Final maintenance cost
    actualCost: {
      type: Number,
      min: 0,
      default: 0,
    },

    // Completion notes
    completionNotes: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Maintenance = mongoose.model(
  "Maintenance",
  maintenanceSchema
);

export default Maintenance;
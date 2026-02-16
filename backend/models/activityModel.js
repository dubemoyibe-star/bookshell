import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },

    entityType: {
      type: String,
      enum: ["book", "order"],
      required: true,
    },

    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'entityType'
    },

    action: {
      type: String,
      required: true,
    },

    details: {
      type: Object, 
      default: {},
    },
  },
  { timestamps: true }
);

const activityModel =
  mongoose.models.Activity || mongoose.model("Activity", activitySchema);

export default activityModel;

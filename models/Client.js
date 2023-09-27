const mongoose = require("mongoose");

const clientSchema = mongoose.Schema(
  {
    clientName: {
        type: String,
        required: true,
      },
    clientId: {
      type: String,
      required: true,
    },
    email: {
        type: String,
        // required: true,
      },
      address: {
        type: String,
        // required: true,
      },
      aflag: {
        type: Boolean,
        default: true,
      },
      userId : 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "UserModel",
        },
        caseMembers: [
          {
            _id: false,
            id: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "UserModel",
            },
            isActive: {
              type: Boolean,
              default: true,
            },
            addedBy: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "UserModel",
            },
            addedAt: {
              type: Date,
              default: Date.now(),
            },
            lastModifiedAt: {
              type: Date,
              default: Date.now(),
            },
          },
        ],
        notifyMembers: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserModel",
          },
        ],
        admins: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserModel",
          },
        ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Client", clientSchema);

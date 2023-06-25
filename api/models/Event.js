const mongoose = require("mongoose");

const EventSchema = mongoose.Schema(
  {
    event_type: {
      type: String,
      require: true,
    },
    event_desc: {
      type: String,
    },
    project_id: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);

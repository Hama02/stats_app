const mongoose = require("mongoose");

const LoggerSchema = mongoose.Schema(
  {
    log_ip: {
      type: String,
      require: true,
    },
    log_name: {
      type: String,
      require: true,
    },
    log_message: {
      type: String,
    },
    event_id: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Logger", LoggerSchema);

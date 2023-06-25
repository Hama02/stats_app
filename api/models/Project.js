const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema(
  {
    project_name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
    },
    admin_id: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);

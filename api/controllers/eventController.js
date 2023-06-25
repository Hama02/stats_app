const Event = require("../models/Event");
const Project = require("../models/Project");

exports.add = async (req, res) => {
  const { event_type, event_desc, project_name } = req.body;
  const project = await Project.findOne({
    project_name,
    admin_id: req.admin._id.toString(),
  });
  if (!project) {
    return res.status(401).json({
      msg: "Project not found",
    });
  }
  const event = new Event({
    event_type,
    event_desc,
    project_id: project._id,
  });

  try {
    await event.save();
    return res.status(200).json(event);
  } catch (err) {
    return res.status(501).json({
      msg: err,
    });
  }
};

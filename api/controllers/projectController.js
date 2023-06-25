const Project = require("../models/Project");

exports.getProject = async (req, res) => {
  const project = await Project.findOne({
    project_name: req.body.project_name,
  });
  if (!project) {
    return res.status(404).json({ msg: "Project Not Found" });
  }
  if (project.admin_id !== req.admin._id.toString()) {
    return res
      .status(401)
      .json({ msg: "This Project Belongs to an other admin!!" });
  }
  return res.status(200).json(project);
};

exports.getAllProjects = async (req, res) => {
  const projects = await Project.find({
    admin_id: req.admin._id.toString(),
  });
  if (projects.length === 0) {
    return res.status(404).json({ msg: "You have no Projects" });
  }

  return res.status(200).json({
    status: "success",
    projects,
  });
};

exports.addProject = async (req, res) => {
  const project = new Project({
    project_name: req.body.project_name,
    description: req.body.description,
    admin_id: req.admin._id,
  });
  try {
    await project.save();
    return res.status(200).json(project);
  } catch (err) {
    return res.status(501).json({
      msg: err,
    });
  }
};

exports.updateProject = async (req, res) => {
  const project = await Project.findOne({
    project_name: req.body.project_name,
  });
  if (!project) {
    return res.status(404).json({
      msg: "Project not found",
    });
  }

  if (req.admin._id.toString() !== project.admin_id) {
    return res.status(401).json({
      msg: "This Project Belongs to an other admin!!",
    });
  }

  project.project_name = req.body.new_project_name || project.project_name;
  project.description = req.body.description || project.description;
  await project.save();
  return res.status(200).json({
    msg: "Project Updated Successfully",
  });
};

exports.deleteProject = async (req, res) => {
  const project = await Project.findOne({
    project_name: req.body.project_name,
  });

  if (!project) {
    return res.status(404).json({
      msg: "Project not found",
    });
  }

  if (req.admin._id.toString() !== project.admin_id) {
    return res.status(401).json({
      msg: "This Project Belongs to an other admin!!",
    });
  }
  try {
    project.deleteOne();
    return res.status(200).json({
      msg: "deleted!!",
    });
  } catch (err) {
    res.status(501).json({
      msg: err,
    });
  }
};

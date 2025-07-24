const User = require('../models/user');
const Project = require('../models/project');

// Function to manage users
exports.manageUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error });
    }
};

// Function to create a new user
exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });

    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error });
    }
};

// Function to update user details
exports.updateUser = async (req, res) => {
    const { userId } = req.params;
    const updates = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: 'Error updating user', error });
    }
};

// Function to delete a user
exports.deleteUser = async (req, res) => {
    const { userId } = req.params;

    try {
        await User.findByIdAndDelete(userId);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: 'Error deleting user', error });
    }
};

// Function to manage projects
exports.manageProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving projects', error });
    }
};

// Function to create a new project
exports.createProject = async (req, res) => {
    const { name, description } = req.body;
    const newProject = new Project({ name, description });

    try {
        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(400).json({ message: 'Error creating project', error });
    }
};

// Function to update project details
exports.updateProject = async (req, res) => {
    const { projectId } = req.params;
    const updates = req.body;

    try {
        const updatedProject = await Project.findByIdAndUpdate(projectId, updates, { new: true });
        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(400).json({ message: 'Error updating project', error });
    }
};

// Function to delete a project
exports.deleteProject = async (req, res) => {
    const { projectId } = req.params;

    try {
        await Project.findByIdAndDelete(projectId);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: 'Error deleting project', error });
    }
};
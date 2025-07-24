const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Route to create a new project
router.post('/', projectController.createProject);

// Route to get all projects
router.get('/', projectController.getAllProjects);

// Route to get a specific project by ID
router.get('/:id', projectController.getProjectById);

// Route to update a project by ID
router.put('/:id', projectController.updateProject);

// Route to delete a project by ID
router.delete('/:id', projectController.deleteProject);

module.exports = router;
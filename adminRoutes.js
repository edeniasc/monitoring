const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const reportController = require('../controllers/reportController');

// User management routes
router.get('/users', adminController.manageUsers);
router.post('/users', adminController.createUser);
router.put('/users/:userId', adminController.updateUser);
router.delete('/users/:userId', adminController.deleteUser);

// Project management routes
router.get('/projects', adminController.manageProjects);
router.post('/projects', adminController.createProject);
router.put('/projects/:projectId', adminController.updateProject);
router.delete('/projects/:projectId', adminController.deleteProject);

// Report generation routes
router.get('/reports/pdf', reportController.generatePdfReport);
router.get('/reports/excel', reportController.generateExcelReport);

module.exports = router;
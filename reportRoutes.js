const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Route to generate PDF report
router.get('/generate-pdf', reportController.generatePdfReport);

// Route to generate Excel report
router.get('/generate-excel', reportController.generateExcelReport);

module.exports = router;
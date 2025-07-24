const Report = require('../models/report'); // Assuming a report model exists
const pdfGenerator = require('../utils/pdfGenerator');
const excelGenerator = require('../utils/excelGenerator');

// Generate PDF report
exports.generatePdfReport = async (req, res) => {
    try {
        const reportData = await Report.find(); // Fetch report data from the database
        const pdfBuffer = await pdfGenerator(reportData); // Generate PDF from data
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=report.pdf',
        });
        res.send(pdfBuffer);
    } catch (error) {
        res.status(500).json({ message: 'Error generating PDF report', error });
    }
};

// Generate Excel report
exports.generateExcelReport = async (req, res) => {
    try {
        const reportData = await Report.find(); // Fetch report data from the database
        const excelBuffer = await excelGenerator(reportData); // Generate Excel from data
        res.set({
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition': 'attachment; filename=report.xlsx',
        });
        res.send(excelBuffer);
    } catch (error) {
        res.status(500).json({ message: 'Error generating Excel report', error });
    }
};
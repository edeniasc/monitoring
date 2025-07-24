const ExcelJS = require('exceljs');

const generateExcelReport = async (data, reportTitle = 'Report') => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(reportTitle);

    // Define columns
    worksheet.columns = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Name', key: 'name', width: 30 },
        { header: 'Description', key: 'description', width: 50 },
        { header: 'Status', key: 'status', width: 15 },
        { header: 'Created At', key: 'createdAt', width: 20 },
    ];

    // Add rows
    data.forEach(item => {
        worksheet.addRow({
            id: item.id,
            name: item.name,
            description: item.description,
            status: item.status,
            createdAt: item.createdAt,
        });
    });

    // Style the header
    worksheet.getRow(1).font = { bold: true };

    // Return as buffer (for direct download)
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};

module.exports = generateExcelReport;
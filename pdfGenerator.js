const PDFDocument = require('pdfkit');
const getStream = require('get-stream');

const generatePDFReport = async (data) => {
    const doc = new PDFDocument();
    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {});

    doc.fontSize(25).text('Report', { align: 'center' });
    doc.moveDown();

    data.forEach(item => {
        doc.fontSize(12).text(`Item: ${item.name || ''}`);
        doc.text(`Description: ${item.description || ''}`);
        doc.text(`Date: ${item.date || ''}`);
        doc.moveDown();
    });

    doc.end();

    // Wait for the PDF to be fully generated and return as a buffer
    return await getStream.buffer(doc);
};

module.exports = generatePDFReport;
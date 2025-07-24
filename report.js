const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    title: String,
    createdAt: { type: Date, default: Date.now },
    // Add other fields as needed
});

module.exports = mongoose.model('Report', reportSchema);
const mongoose = require('mongoose');

const workLogSchema = new mongoose.Schema({
    projectId: {
        type: String,
        required: true
    },
    processId: {
        type: String,
        required: true
    },
    workerName: {
        type: String,
        required: true
    },
    employeeNumber: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        default: Date.now
    },
    endTime: {
        type: Date
    },
    status: {
        type: String,
        enum: ['in-progress', 'completed'],
        default: 'in-progress'
    },
    photos: {
        type: [String],
        default: []
    },
    notes: {
        type: String
    }
});

const WorkLog = mongoose.model('WorkLog', workLogSchema);

module.exports = WorkLog;
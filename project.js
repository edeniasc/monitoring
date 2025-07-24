const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    processes: [{
        id: String,
        name: String,
        order: Number,
        description: String
    }],
    status: {
        type: String,
        enum: ['active', 'completed', 'archived'],
        default: 'active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: String,
        required: true
    }
});

projectSchema.methods.toJSON = function() {
    const project = this;
    const projectObject = project.toObject();

    return projectObject;
};

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
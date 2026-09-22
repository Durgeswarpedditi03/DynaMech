const mongoose = require("mongoose");

const serviceRequestSchema = new mongoose.Schema({
    customerEmail: {
        type: String,
        required: true
    },

    vehicle: {
        type: String,
        required: true
    },

    vehicleType: {
        type: String,
        required: true
    },

    problem: {
        type: String,
        required: true
    },

    problemImages: {
        type: [String],
        default: []
    },

    location: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: "Pending"
    },

    repairPlan: {
        type: String,
        enum: ["On-site repair", "Workshop or towing required", "To be assessed"],
        default: "To be assessed"
    },

    estimatedTime: {
        type: String,
        default: "To be confirmed by mechanic"
    }
});

const ServiceRequest = mongoose.model(
    "ServiceRequest",
    serviceRequestSchema
);

module.exports = ServiceRequest;
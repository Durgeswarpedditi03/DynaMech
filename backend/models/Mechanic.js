const mongoose = require("mongoose");

const mechanicSchema = new mongoose.Schema({

    // Mechanic basic details
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },


    // Vehicle types the mechanic can repair
    vehicleTypes: {
        type: [String],
        default: []
    },


    // Mechanic location
    location: {
        type: String,
        default: ""
    },


    // Mechanic availability
    available: {
        type: Boolean,
        default: true
    },


    // Mechanic verification by admin
    verified: {
        type: Boolean,
        default: false
    },


    // Mechanic rating
    rating: {
        type: Number,
        default: 0
    },


    // Number of completed jobs
    completedJobs: {
        type: Number,
        default: 0
    }

});

const Mechanic = mongoose.model(
    "Mechanic",
    mechanicSchema
);

module.exports = Mechanic;
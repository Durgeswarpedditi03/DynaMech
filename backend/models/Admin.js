const mongoose = require("mongoose");


// ==================== Admin Schema ====================

const adminSchema = new mongoose.Schema({

    // Admin name
    name: {
        type: String,
        required: true
    },

    // Admin email
    email: {
        type: String,
        required: true,
        unique: true
    },

    // Admin password
    password: {
        type: String,
        required: true
    }

});


// ==================== Admin Model ====================

const Admin = mongoose.model(
    "Admin",
    adminSchema
);


module.exports = Admin;
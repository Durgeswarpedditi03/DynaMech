const mongoose = require("mongoose");


// ==================== Spare Part Schema ====================

const sparePartSchema = new mongoose.Schema({

    // Spare part name
    partName: {
        type: String,
        required: true
    },

    // Spare part description
    description: {
        type: String,
        required: true
    },

    // Spare part price
    price: {
        type: Number,
        required: true
    },

    // Available quantity
    quantity: {
        type: Number,
        required: true
    }

});


// ==================== Spare Part Model ====================

const SparePart = mongoose.model(
    "SparePart",
    sparePartSchema
);


module.exports = SparePart;
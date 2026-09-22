const mongoose = require("mongoose");


// ==================== Order Schema ====================

const orderSchema = new mongoose.Schema({

    // Customer email
    customerEmail: {
        type: String,
        required: true
    },

    // Spare part name
    partName: {
        type: String,
        required: true
    },

    // Price of one part
    price: {
        type: Number,
        required: true
    },

    // Number of parts ordered
    quantity: {
        type: Number,
        required: true
    },

    // Total order price
    totalPrice: {
        type: Number,
        required: true
    },

    // Order status
    status: {
        type: String,
        default: "Pending"
    }

});


// ==================== Order Model ====================

const Order = mongoose.model(
    "Order",
    orderSchema
);


module.exports = Order;
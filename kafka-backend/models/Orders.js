const mongoose = require("mongoose");

const Orders = new mongoose.Schema({
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customers',
        required: true
    },
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurants',
        required: true
    },
    order_type: {
        type: String,
        enum: ['Pickup', 'Delivery', 'Common'],
        default: 'Common',
        required: true
    },
    order_status: {
        type: String,
        enum: ['Picked Up', 'Pick Up Ready', 'Order Placed', 'On The Way', 'In the making', 'Delivered', 'Cancelled'],
        default: 'Order Placed',
        required: true
    },
    order_date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    order_time: {
        type: String,
        required: true,
        default: `${Date.now().getHours}:${Date.now().getMinutes}:${Date.now().getSeconds}`
    },
    order_total_price: {
        type: Number,
        required: true,
        default: 0,
    },
    delivery_address: {
        DeliveryAddress
    },
    payment_card_digits: {
        type: Number,
        required: true,
    },
    order_items: [OrderItems]
}, { versionKey: false })



const OrderItems = new mongoose.Schema({

    dish_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish',
        required: true
    },
    count: {
        type: Number,
        required: true,
    },
}, { versionKey: false })

const DeliveryAddress = new mongoose.Schema({
    delivery_address: {
        type: String,
        required: true,
    },
    address_city: {
        type: String,
        required: true,
    },
    address_state: {
        type: String,
        required: true,
    },
    address_postal_code: {
        type: Number,
        required: true,
    },
    address_latitude: {
        type: Number,
        required: true,
    },
    address_longitude: {
        type: Number,
        required: true,
    },
    primary_phone: {
        type: Number,
        required: true,
    },
}, { versionKey: false })

module.exports = mongoose.model('Orders', Orders)

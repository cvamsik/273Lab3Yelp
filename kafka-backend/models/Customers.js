
const mongoose = require("mongoose");

const Customers = new mongoose.Schema({
    customer_id: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    customer_name: {
        type: String,
        required: true,
    },
    birthday: {
        type: Date,
        required: true
    },
    contact_number: {
        type: Number,
        required: true
    },
    email_id: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    review_count: {
        type: Number,
    },
    yelping_since: {
        type: Number,
        required: true
    },
    things_loved: {
        type: String,
        required: true
    },
    find_me: {
        type: String,
        required: true
    },
    blog_ref: {
        type: String,
        required: true
    },
    singup_date: {
        type: Date,
        required: true
    },
    profile_image_link: {
        type: String,
        required: true
    },

}, { versionKey: false })

module.exports = mongoose.model('Customers', Customers)

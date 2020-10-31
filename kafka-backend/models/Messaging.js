
const mongoose = require("mongoose");

const Messaging = new mongoose.Schema({
    conversation_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurants',
        required: true
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurants',
        required: true
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }]

}, { versionKey: false })


const Message = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    timeStamp: {
        type: Date,
        required: true
    },
    sender: {
        type: Number,
        required: true
    },

}, { versionKey: false })





module.exports = mongoose.model('Messaging', Messaging)
module.exports = mongoose.model('Message', Message)


const mongoose = require("mongoose");

const Menu = new mongoose.Schema({
    menu_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurants',
        required: true
    },
    dishes: [Dish]

}, { versionKey: false })




module.exports = mongoose.model('Menu', Menu)

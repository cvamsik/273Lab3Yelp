
const mongoose = require("mongoose");
const Dish = require('./Dish')

const Menu = new mongoose.Schema({
    menu_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurants',
    },
    dishes: { type: [Dish] }

}, { versionKey: false })




module.exports = mongoose.model('Menu', Menu)

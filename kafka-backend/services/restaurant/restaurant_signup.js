const {
    CONTENT_TYPE,
    APP_JSON,
    RES_SUCCESS,
    RES_BAD_REQUEST,
    RES_NOT_FOUND,
    RES_DUPLICATE_RESOURCE,
    TEXT_PLAIN,
    RES_INTERNAL_SERVER_ERROR
} = require("../../config/routeConstants");
const mongoose = require("mongoose");


const Restaurant = require('../../models/Restaurants')

function handle_request(msg, callback) {

    console.log("Inside Restaurant Signup ->kafka backend");
    console.log(msg);

    var id = mongoose.Types.ObjectId()
    console.log('Req Body : ', msg)
    let mesg = new Restaurant({
        restaurant_id: id,
        restaurant_name: msg.restaurant_name,
        restaurant_location: msg.restaurant_location,
        restaurant_description: msg.restaurant_description,
        restaurant_address: msg.restaurant_address,
        address_city: msg.address_city,
        address_state: msg.address_state,
        address_postal_code: msg.address_postal_code,
        address_latitude: msg.address_latitude,
        address_longitude: msg.address_longitude,
        primary_phone: msg.primary_phone,
        secondary_phone: msg.secondary_phone,
        email: msg.email,
        open_time: msg.open_time,
        close_time: msg.close_time,
        password: msg.password,
    })
    console.log(msg)
    mesg
        .save()
        .then(response => {
            console.log('response' + response)
            callback(null, response)
        })
        .catch(err => {
            console.log('Error occured while inserting data in DB' + err)
            callback(err, 'Error')
        })



    callback(null, msg);
    console.log("after callback");
};

exports.handle_request = handle_request;



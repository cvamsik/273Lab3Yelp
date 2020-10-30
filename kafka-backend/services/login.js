const {
    CONTENT_TYPE,
    APP_JSON,
    RES_SUCCESS,
    RES_BAD_REQUEST,
    RES_NOT_FOUND,
    RES_DUPLICATE_RESOURCE,
    TEXT_PLAIN,
    RES_INTERNAL_SERVER_ERROR
} = require("../config/routeConstants");
const mongoose = require("mongoose");
const routes = require("../config/routeConstants");

const LoginCredentials = require('../models/LoginCredentials')

function handle_request(msg, callback) {

    console.log("Inside Login Services ->kafka backend");
    console.log(msg);
    switch (msg.api) {
        case routes.POST_LOGIN:
            LoginCredentials.findOne({ email_id: msg.body.username }, (err, response) => {
                if (err) {
                    console.log('User Not found' + err)
                    callback(err, 'Error')
                }
                else {
                    console.log('response' + response)
                    callback(null, response)
                }
            })



    }
    // callback(null, response);
    // console.log("after callback");
};

exports.handle_request = handle_request;



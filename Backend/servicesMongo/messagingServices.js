const { response } = require('express');
const mongoose = require("mongoose");


const {
    CONTENT_TYPE,
    APP_JSON,
    RES_SUCCESS,
    RES_BAD_REQUEST,
    RES_NOT_FOUND,
    RES_DUPLICATE_RESOURCE,
    TEXT_PLAIN,
    RES_INTERNAL_SERVER_ERROR,
    POST_LOGIN
} = require("../config/routeConstants");

const kafka = require('../kafka/client')


module.exports.initiateMessage = (req, res) => {
    console.log("Inside POST Message Initiate service");
    console.log("req body" + JSON.stringify(req.body));
    kafka.make_request('messages', {
        api: "POST_INITIATE_MESSAGE",
        body: req.body
    }, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json(results);

            res.end();
        }

    });


}



module.exports.postMessage = (req, res) => {
    console.log("Inside POST Message service");
    console.log("req body" + JSON.stringify(req.body));
    kafka.make_request('messages', {
        api: "POST_MESSGAGES",
        body: req.body
    }, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json(results);

            res.end();
        }

    });


}

module.exports.messagesListRestaurant = (req, res) => {
    console.log("Inside Get Message List service");
    console.log("req body" + JSON.stringify(req.body));
    kafka.make_request('messages', {
        api: "GET_MESSAGES_LIST_RESTAURANT",
        body: req.query
    }, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json(results);

            res.end();
        }

    });


}

module.exports.messagesListCustomer = (req, res) => {
    console.log("Inside Get Message List service");
    console.log("req body" + JSON.stringify(req.body));
    kafka.make_request('messages', {
        api: "GET_MESSAGES_LIST_CUSTOMER",
        body: req.query
    }, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json(results);

            res.end();
        }

    });


}

module.exports.getMessages = (req, res) => {
    console.log("Inside Get Message List service");
    console.log("req body" + JSON.stringify(req.body));
    kafka.make_request('messages', {
        api: "GET_MESSAGES",
        body: req.query
    }, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json(results);

            res.end();
        }

    });


}
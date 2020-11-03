const { response } = require('express');
const con = require('../config/dbConnection');
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

const kafka = require('../kafka/client')


module.exports.getAllEvents = (req, res) => {

    console.log("Inside Events GET all service");
    console.log(req.query)
    kafka.make_request('events', {
        api: "GET_ALL_EVENTS",
        body: req.query
    }, function (error, result) {
        console.log('in result');
        console.log(result);
        if (error) {
            console.log("Inside err");
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
        } else {
            console.log("Inside else");
            res.status(RES_SUCCESS).send(JSON.stringify(result));
        }

    });

}



module.exports.registerEvent = (req, res) => {

    console.log("Inside Events POST registration service");
    console.log(req.body)

    kafka.make_request('events', {
        api: "POST_EVENT_REGISTRATION",
        body: req.body
    }, function (error, result) {
        console.log('in result');
        console.log(result);
        if (error) {
            console.log("Inside err");
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
        } else {
            console.log("Inside else");
            res.status(RES_SUCCESS).send(JSON.stringify(result));
        }

    });

}



module.exports.createEvent = (req, res) => {

    console.log("Inside Events POST create service");
    console.log(req.body)

    kafka.make_request('events', {
        api: "POST_EVENT",
        body: req.body
    }, function (error, result) {
        console.log('in result');
        console.log(result);
        if (error) {
            console.log("Inside err");
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
        } else {
            console.log("Inside else");
            res.status(RES_SUCCESS).send(JSON.stringify(result));
        }

    });

}



module.exports.getEventsByRestaurantID = (req, res) => {

    console.log("Inside Events GET by restaurantID service");
    console.log(req.query)

    kafka.make_request('events', {
        api: "GET_EVENT_BY_RESTAURANT",
        body: req.query
    }, function (error, result) {
        console.log('in result');
        console.log(result);
        if (error) {
            console.log("Inside err");
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
        } else {
            console.log("Inside else");
            res.status(RES_SUCCESS).send(JSON.stringify(result));
        }

    });
}


module.exports.getRegistrationsByCustomerID = (req, res) => {

    console.log("Inside Events GET registrations by customer service");
    console.log(req.query)

    kafka.make_request('events', {
        api: "GET_REGISTRATIONS_CUSTOMER",
        body: req.query
    }, function (error, result) {
        console.log('in result');
        console.log(result);
        if (error) {
            console.log("Inside err");
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
        } else {
            console.log("Inside else");
            res.status(RES_SUCCESS).send(JSON.stringify(result));
        }

    });

}


module.exports.getRegistrationsByEventId = (req, res) => {

    console.log("Inside Events GET registrations by eventid service");
    console.log(req.query)

    kafka.make_request('events', {
        api: "GET_REGISTRATIONS_EVENT",
        body: req.query
    }, function (error, result) {
        console.log('in result');
        console.log(result);
        if (error) {
            console.log("Inside err");
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
        } else {
            console.log("Inside else");
            res.status(RES_SUCCESS).send(JSON.stringify(result));
        }

    });

}

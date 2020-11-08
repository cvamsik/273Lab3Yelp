const { response } = require('express');
// const con = require('../config/dbConnection');
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


module.exports.getReviewsByRestaurant = (req, res) => {

    console.log("Inside Reviews GET by Restaurant service");
    console.log(req.query)

    kafka.make_request('reviews', {
        api: "GET_REVIEWS_BY_RESTAURANT",
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


module.exports.postReviewCustomer = (req, res) => {

    console.log("Inside Reviews POST customer service");

    kafka.make_request('reviews', {
        api: "POST_REVIEW_CUSTOMER",
        body: req.body
    }, function (error, result) {
        console.log('in result');
        console.log(result);
        if (error) {
            console.log("Inside err");
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
        } else {
            console.log("Inside else Reviews");
            res.status(RES_SUCCESS).send(JSON.stringify(result));
        }

    });

}


module.exports.getReviewsByIDRestaurant = (req, res) => {

    console.log("Inside Reviews GET by Restaurant service");
    console.log(req.query)
    kafka.make_request('reviews', {
        api: "GET_REVIEWS_ID_RESTAURANT",
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

module.exports.getReviewsByCustomer = (req, res) => {

    console.log("Inside Reviews GET by Customer service");
    console.log(req.query)

    kafka.make_request('reviews', {
        api: "GET_REVIEWS_BY_CUSTOMER",
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



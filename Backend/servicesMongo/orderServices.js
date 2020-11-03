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

module.exports.createOrder = (req, res) => {
    console.log("Inside Order Create POST service");
    console.log("req body" + JSON.stringify(req.body.cart_items[0]));

    kafka.make_request('orders', {
        api: "POST_ORDER",
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


module.exports.getOrdersByCustomerID = (req, res) => {
    console.log("Inside Orders GET customer all orders service");
    console.log(req.query)

    kafka.make_request('orders', {
        api: "GET_ORDER_BY_CUSTOMER",
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

module.exports.getOrdersByRestaurantID = (req, res) => {
    console.log("Inside Orders GET restaurant all orders service");
    console.log(req.query);
    kafka.make_request('orders', {
        api: "GET_ORDER_BY_RESTAURANT",
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

module.exports.getOrdersByOrderID = (req, res) => {
    console.log("Inside Orders GET order service");
    console.log(req.query)
    kafka.make_request('orders', {
        api: "GET_ORDER_BY_ID",
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






module.exports.updateOrderStatus = (req, res) => {
    console.log("Inside Orders PUT update status service");
    console.log(req.body);

    kafka.make_request('orders', {
        api: "UPDATE_ORDER",
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

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
const routes = require("../config/routeConstants");

const kafka = require('../kafka/client')


module.exports.createRestaurant = (req, res) => {
    console.log("Inside Restaurant Create POST service");
    console.log("req body" + JSON.stringify(req.body));
    kafka.make_request('restaurant', {
        api: "POST_RESTAURANT_SIGNUP",
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


module.exports.getMenuByEmail = (req, res) => {
    console.log("Inside Restaurant GET menu by res email service");
    console.log(req.query)
    kafka.make_request('restaurant', {
        api: "GET_RESTAURANT_MENU",
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


module.exports.getAllRestaurants = (req, res) => {
    console.log("Inside Restaurant GET menu service");
    console.log(req.query)

    kafka.make_request('restaurant', {
        api: "GET_ALL_RESTAURANTS",
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

module.exports.getRestaurantProfile = (req, res) => {
    console.log("Inside Restaurant GET Profile service");
    console.log(req.query)

    kafka.make_request('restaurant', {
        api: "GET_RESTAURANT_PROFILE",
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



module.exports.updateRestaurantProfile = (req, res) => {
    console.log("Inside Restaurant PUT profile service");
    console.log("req body" + JSON.stringify(req.body));

    kafka.make_request('restaurant', {
        api: "UPDATE_RESTAURANT_PROFILE",
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




module.exports.updateMenuItem = (req, res) => {
    console.log("Inside Restaurant PUT menuItem service");
    console.log("req body" + JSON.stringify(req.body));

    kafka.make_request('restaurant', {
        api: "UPDATE_MENU_ITEM",
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


module.exports.createMenuItem = (req, res) => {
    console.log("Inside Restaurant POST menuItem service");
    console.log("req body" + JSON.stringify(req.body));

    kafka.make_request('restaurant', {
        api: "POST_MENU_ITEM",
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


module.exports.getRestaurantSearch = (req, res) => {
    console.log("Inside Restaurant GET Search service");
    console.log(req.query)


    kafka.make_request('restaurant', {
        api: "GET_RESTAURANT_SEARCH",
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
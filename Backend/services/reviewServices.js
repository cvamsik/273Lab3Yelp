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



module.exports.getReviewsByRestaurant = (req, res) => {

    console.log("Inside Reviews GET by Restaurant service");
    console.log(req.query)
    con.query(`
    SELECT stars,review_date,review_text,customer_name FROM reviews INNER JOIN customer_primary_data ON reviews.customer_id=customer_primary_data.customer_id WHERE restaurant_id ="${req.query.restaurant_id}";
        `
        , (error, result) => {
            if (error) {
                console.log(error);
                //res.setHeader(CONTENT_TYPE, APP_JSON);
                // con.rollback();
                res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
            }
            else {
                console.log(JSON.stringify(result));
                //res.setHeader(CONTENT_TYPE, APP_JSON);
                res.status(RES_SUCCESS).send(JSON.stringify(result));
            }
        });

}


module.exports.postReviewCustomer = (req, res) => {

    console.log("Inside Reviews POST customer service");

    con.query(`
    INSERT INTO reviews (customer_id,restaurant_id,stars,review_date,review_text) 
    VALUES ((SELECT customer_id FROM customer_primary_data WHERE email_id="${req.body.email_id}"),"${req.body.restaurant_id}",${req.body.stars},CURDATE(),"${req.body.review_text}")
        `
        , (error, result) => {
            if (error) {
                console.log(error);
                //res.setHeader(CONTENT_TYPE, APP_JSON);
                con.rollback();
                res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
            }
            else {
                console.log(JSON.stringify(result));
                //res.setHeader(CONTENT_TYPE, APP_JSON);
                res.status(RES_SUCCESS).send(JSON.stringify(result));
            }
        });

}


module.exports.getReviewsByIDRestaurant = (req, res) => {

    console.log("Inside Reviews GET by Restaurant service");
    console.log(req.query)
    con.query(`
    SELECT stars,review_date,review_text,customer_name FROM reviews INNER JOIN customer_primary_data ON reviews.customer_id=customer_primary_data.customer_id WHERE restaurant_id = (SELECT restaurant_id FROM restaurant_data WHERE email="${req.query.email}" LIMIT 1);
 `
        , (error, result) => {
            if (error) {
                console.log(error);
                //res.setHeader(CONTENT_TYPE, APP_JSON);
                // con.rollback();
                res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
            }
            else {
                console.log(JSON.stringify(result));
                //res.setHeader(CONTENT_TYPE, APP_JSON);
                res.status(RES_SUCCESS).send(JSON.stringify(result));
            }
        });

}

module.exports.getReviewsByCustomer = (req, res) => {

    console.log("Inside Reviews GET by Customer service");
    console.log(req.query)
    con.query(`SELECT stars,review_date,review_text,customer_name,restaurant_name FROM reviews re
    INNER JOIN customer_primary_data ON re.customer_id=customer_primary_data.customer_id
    INNER JOIN restaurant_data r ON r.restaurant_id=re.restaurant_id  
    WHERE customer_primary_data.email_id ="${req.query.email_id}";
    `
        , (error, result) => {
            if (error) {
                console.log(error);
                //res.setHeader(CONTENT_TYPE, APP_JSON);
                // con.rollback();
                res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
            }
            else {
                console.log(JSON.stringify(result));
                //res.setHeader(CONTENT_TYPE, APP_JSON);
                res.status(RES_SUCCESS).send(JSON.stringify(result));
            }
        });

}
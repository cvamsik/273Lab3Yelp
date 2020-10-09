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



module.exports.getAllEvents = (req, res) => {

    console.log("Inside Events GET all service");
    console.log(req.query)
    con.query(`
    SELECT e.event_id, event_name, event_description, event_date,
 event_time, event_creator_id, event_latitude, event_longitude, 
 event_hashtags, restaurant_name,restaurant_address,image_url  
 FROM events e 
 INNER JOIN restaurant_data  r ON e.event_creator_id=r.restaurant_id
 INNER JOIN event_images i ON i.event_id=e.event_id 
 WHERE e.event_date>curdate() ORDER BY event_date DESC ;
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



module.exports.registerEvent = (req, res) => {

    console.log("Inside Events POST registration service");
    console.log(req.body)
    con.query(`
        INSERT INTO registrations(event_id,customer_id,registration_date,registration_time) 
        VALUES (${req.body.event_id},(SELECT customer_id FROM customer_primary_data WHERE email_id="${req.body.email_id}"),CURDATE(),CURTIME())
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



module.exports.createEvent = (req, res) => {

    console.log("Inside Events POST create service");
    // console.log(`
    // INSERT INTO events(event_name, event_description, event_date,
    //     event_time, event_creator_id, event_latitude, event_longitude, 
    //     event_hashtags) VALUES("${req.body.event_name}","${req.body.event_description}","${req.body.event_date}","${req.body.event_time}",
    //     (SELECT restaurant_id FROM restaurant_data WHERE email="${req.body.email_id}" LIMIT 1)
    //     ,"${req.body.event_latitude}","${req.body.event_longitude}","${req.body.event_hashtags}");    
    // `)
    if (req.body.image_url == undefined) {
        req.body.image_url = "undefined"
    }
    con.query(`
    BEGIN;
    INSERT INTO events(event_name, event_description, event_date,
        event_time, event_creator_id, event_latitude, event_longitude, 
        event_hashtags) VALUES("${req.body.event_name}","${req.body.event_description}","${req.body.event_date}","${req.body.event_time}",
        (SELECT restaurant_id FROM restaurant_data WHERE email="${req.body.email_id}" LIMIT 1)
        ,"${req.body.event_latitude}","${req.body.event_longitude}","${req.body.event_hashtags}");
        INSERT INTO event_images(event_id,image_url) VALUES (LAST_INSERT_ID(),"undefined");
        COMMIT;
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



module.exports.getEventsByRestaurantID = (req, res) => {

    console.log("Inside Events GET by restaurantID service");

    con.query(`
    SELECT e.event_id, event_name, event_description, event_date,
    event_time, event_creator_id, event_latitude, r.email,
event_longitude,
     event_hashtags, restaurant_name,restaurant_address
 FROM events e
 INNER JOIN restaurant_data  r ON e.event_creator_id=r.restaurant_id
 WHERE e.event_date>curdate()  AND  r.email="${req.query.email_id}"   ORDER BY event_date DESC; 
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


module.exports.getRegistrationsByCustomerID = (req, res) => {

    console.log("Inside Events GET registrations by customer service");
    console.log(req.query)
    con.query(`
    SELECT e.event_id, event_name, event_description, event_date,
 event_time, event_creator_id, event_latitude, event_longitude, 
 event_hashtags, restaurant_name,restaurant_address,image_url,registration_date,registration_time
 FROM events e 
 INNER JOIN restaurant_data  r ON e.event_id=r.restaurant_id
 INNER JOIN event_images i ON i.event_id=e.event_id 
 INNER JOIN registrations reg ON reg.event_id=e.event_id
 WHERE e.event_date>curdate() AND reg.customer_id IN (SELECT customer_id from customer_primary_data WHERE email_id="${req.query.email_id}") ORDER BY event_date DESC ;
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


module.exports.getRegistrationsByEventId = (req, res) => {

    console.log("Inside Events GET registrations by eventid service");
    console.log(req.query)
    con.query(`
    SELECT event_id, registration_date, registration_time, c.customer_id, customer_name, contact_number, email_id FROM registrations as r 
    INNER JOIN customer_primary_data c ON r.customer_id=c.customer_id
    WHERE r.event_id=${req.query.event_id};
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

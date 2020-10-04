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


module.exports.createRestaurant = (req, res) => {
    console.log("Inside Restaurant Create POST service");
    console.log("req body" + JSON.stringify(req.body));

    con.query(
        `BEGIN;
        INSERT INTO login_credentials (email_id,user_password,user_type) VALUES ("${req.body.email}","${req.body.password}","2");
        INSERT INTO restaurant_data (restaurant_name,restaurant_location, restaurant_description,restaurant_address,address_city,address_state,address_postal_code,address_latitude,address_longitude,primary_phone,secondary_phone,open_time,close_time,email) VALUES ("${req.body.restaurant_name}","${req.body.restaurant_location}", "${req.body.restaurant_description}","${req.body.restaurant_address}","${req.body.address_city}","${req.body.address_state}","${req.body.address_postal_code}","${req.body.address_latitude}","${req.body.address_longitude}","${req.body.primary_phone}","${req.body.secondary_phone}","${req.body.open_time}","${req.body.close_time}","${req.body.email}");
        COMMIT; `
        , (error, result) => {
            if (error) {
                console.log(error);
                //res.setHeader(CONTENT_TYPE, APP_JSON);
                res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
                con.rollback();
            }
            else {
                console.log(JSON.stringify(result));
                //res.setHeader(CONTENT_TYPE, APP_JSON);
                res.status(RES_SUCCESS).end(JSON.stringify(result));
            }
        });

}


module.exports.getMenuByEmail = (req, res) => {
    console.log("Inside Restaurant GET menu service");
    console.log(req.query)
    con.query(`SELECT dish_id,dish_name,price,description,category_name,ingredients,image_url FROM  restaurant_data as r  
                    INNER JOIN menus as m ON r.restaurant_id=m.restaurant_id 
                    INNER JOIN dishes as d ON m.menu_id=d.menu_id 
                    INNER JOIN categories as c ON c.category_id=d.category_id  WHERE r.email="${req.query.email}"`
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


module.exports.getAllRestaurants = (req, res) => {
    console.log("Inside Restaurant GET menu service");
    console.log(req.query)
    con.query(`SELECT * FROM  restaurant_data r LIMIT 10`
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

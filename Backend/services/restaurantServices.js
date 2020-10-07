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
    con.query(`SELECT dish_id,dish_name,price,description,c.category_id,ingredients,image_url,m.menu_id FROM  restaurant_data as r  
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

module.exports.getRestaurantProfile = (req, res) => {
    console.log("Inside Restaurant GET Profile service");
    console.log(req.query)
    con.query(`SELECT * FROM  restaurant_data r WHERE r.email="${req.query.email_id}"`
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



module.exports.updateRestaurantProfile = (req, res) => {
    console.log("Inside Restaurant PUT profile service");
    console.log("req body" + JSON.stringify(req.body));

    con.query(
        `BEGIN;
        UPDATE restaurant_data SET 
        address_city="${req.body.address_city}",
        address_latitude=${req.body.address_latitude},
        address_longitude=${req.body.address_longitude},
        address_postal_code=${req.body.address_postal_code},
        address_state="${req.body.address_state}",
        close_time="${req.body.close_time}",
        is_open=${req.body.is_open},
        open_time="${req.body.open_time}",
        primary_phone=${req.body.primary_phone},
        restaurant_address="${req.body.restaurant_address}",
        restaurant_description="${req.body.restaurant_description}",
        restaurant_location="${req.body.restaurant_location}",
        restaurant_name="${req.body.restaurant_name}",
        secondary_phone="${req.body.secondary_phone}"
        WHERE email="${req.body.email}";

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




module.exports.updateMenuItem = (req, res) => {
    console.log("Inside Restaurant PUT menuItem service");
    console.log("req body" + JSON.stringify(req.body));

    con.query(
        `BEGIN;
        UPDATE dishes SET 
        dish_name="${req.body.dish_name}",
        price=${req.body.price},
        description="${req.body.description}",
        ingredients="${req.body.ingredients}",
        image_url="${req.body.image_url}",
        category_id=${req.body.category_id}
        WHERE dish_id=${req.body.dish_id};
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


module.exports.createMenuItem = (req, res) => {
    console.log("Inside Restaurant POST menuItem service");
    console.log("req body" + JSON.stringify(req.body));
    console.log(`BEGIN;
    INSERT INTO dishes (dish_name,price,description,ingredients,image_url,category_id,menu_id) VALUES
    ("${req.body.dish_name}",
    ${req.body.price},
    "${req.body.description}",
    "${req.body.ingredients}",
    "${req.body.image_url}",
    ${req.body.category_id},
    (SELECT menu_id FROM menus WHERE restaurant_id=(SELECT restaurant_id FROM restaurant_data WHERE email="${req.body.email}" LIMIT 1) LIMIT 1));
    COMMIT; `)
    con.query(
        `BEGIN;
        INSERT INTO dishes (dish_name,price,description,ingredients,image_url,category_id,menu_id) VALUES
        ("${req.body.dish_name}",
        ${req.body.price},
        "${req.body.description}",
        "${req.body.ingredients}",
        "${req.body.image_url}",
        ${req.body.category_id},
        (SELECT menu_id FROM menus WHERE restaurant_id=(SELECT restaurant_id FROM restaurant_data WHERE email="${req.body.email}" LIMIT 1) LIMIT 1));
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


module.exports.getRestaurantSearch = (req, res) => {
    console.log("Inside Restaurant GET Search service");
    console.log(req.query)
    con.query(`
        SELECT address_city,address_latitude,address_longitude,address_postal_code,address_state,close_time,email,is_open,open_time,primary_phone,profile_image_link,restaurant_address,restaurant_description,r.restaurant_id,restaurant_location,restaurant_name,review_count,secondary_phone,stars_avg
        FROM restaurant_data as r
        INNER JOIN menus as m ON m.restaurant_id=r.restaurant_id
        INNER JOIN dishes as d ON d.menu_id=m.menu_id
        WHERE CONCAT_WS(" ",r.restaurant_name,r.restaurant_address,d.dish_name,r.address_postal_code) LIKE '%${req.query.search_string}%' GROUP BY r.restaurant_id;
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
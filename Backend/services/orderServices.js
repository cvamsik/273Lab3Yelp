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


module.exports.createOrder = (req, res) => {
    console.log("Inside Order Create POST service");
    console.log("req body" + JSON.stringify(req.body));
    if (req.body.order_type == "Delivery") {
        con.query(
            `BEGIN;
        INSERT INTO delivery_address(
            delivery_address,address_city,address_state ,address_postal_code ,address_latitude,address_longitude ,primary_phone )
            VALUES (
                 "${req.body.delivery_address},"${req.body.address_city},"${req.body.address_state} ,"${req.body.address_postal_code} ,${req.body.address_latitude},${req.body.address_longitude} ,${req.body.primary_phone} );
        INSERT INTO orders (
            customer_email,restaurant_id,order_type,order_status,order_date ,order_time ,order_total_price ,delivery_address_id ,payment_card_digits ) 
            VALUES (
                ${req.body.customer_email},${req.body.restaurant_id},${req.body.order_type},${req.body.order_status} ,CURDATE() ,CURTIME() ,${req.body.order_total_price},LAST_INSERT_ID(),${req.body.payment_card_digits}
            );
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
    else {


        con.query(
            `BEGIN;    
            INSERT INTO orders (
                customer_email,restaurant_id,order_type,order_status, order_date ,order_time ,order_total_price ,payment_card_digits ) 
                VALUES (
                    "${req.body.customer_email}" ,${req.body.restaurant_id},"${req.body.order_type}","${req.body.order_status}" ,CURDATE(),CURTIME() ,${req.body.order_total_price},${req.body.payment_card_digits});
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

}


module.exports.getOrdersByCustomerID = (req, res) => {
    console.log("Inside Orders GET customer all orders service");
    console.log(req.query)
    con.query(`SELECT o.order_id,o2.order_type,o3.order_status,o.order_date,o.order_time,r.restaurant_name,o.order_total_price
                 FROM  orders as o 
                 INNER JOIN restaurant_data as r ON o.restaurant_id=r.restaurant_id
                 INNER JOIN order_types as o2 ON o.order_type=o2.order_type_id 
                 INNER JOIN order_status as o3 ON o.order_status=o3.order_status_id
                 WHERE o.customer_email="${req.query.customer_email}"
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

module.exports.getOrdersByRestaurantID = (req, res) => {
    console.log("Inside Orders GET restaurant all orders service");
    console.log(req.query)
    con.query(`SELECT o.order_id,o.order_type,o.order_status,o.order_date,o.order_time,o.customer_id
                 FROM  orders as o 
                 INNER JOIN restaurant_data as r ON o.restaurant_id=r.restaurant_id
                 WHERE r.email="${req.query.email_id}"
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

module.exports.getOrdersByOrderID = (req, res) => {
    console.log("Inside Orders GET order service");
    console.log(req.query)

    con.query(`SELECT r.restaurant_name, r.restaurant_address,r.address_city,r.primary_phone,r.secondary_phone,r.email,o2.order_type,o3.order_status,o.order_time,o.order_date,o.order_total_price,o.payment_card_digits
                FROM  orders as o 
                INNER JOIN restaurant_data as r ON o.restaurant_id=r.restaurant_id
                INNER JOIN customer_primary_data as c ON o.customer_email=c.email_id
                INNER JOIN order_types as o2 ON o.order_type=o2.order_type_id 
                INNER JOIN order_status as o3 ON o.order_status=o3.order_status_id
                WHERE o.order_id=${req.query.order_id}       
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

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



module.exports.getAllCustomers = (req, res) => {
    console.log("Inside Customer GET All service");
    con.query("SELECT * FROM customer_primary_data ", (error, result, fields) => {
        if (error) {
            console.log(error);
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
        }
        else {
            console.log(JSON.stringify(result));
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            res.status(RES_SUCCESS).end(JSON.stringify(result));
        }
    });

}

module.exports.getCustomer = (req, res) => {
    console.log("Inside Customer GET service");
    console.log("req params" + JSON.stringify(req.query));
    con.query(`SELECT * FROM customer_primary_data c1 INNER JOIN customer_secondary_data c2 ON c1.customer_id=c2.customer_id WHERE c1.customer_id=${req.query.id}`, (error, result) => {
        if (error) {
            console.log(error);
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
        }
        else {
            console.log(JSON.stringify(result));
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            res.status(RES_SUCCESS).end(JSON.stringify(result));
        }
    });

}

module.exports.createCustomer = (req, res) => {
    console.log("Inside Customer Create POST service");
    console.log("req body" + JSON.stringify(req.body));

    con.query(`INSERT INTO login_credentials (email_id,user_password,user_type) VALUES ("${req.body.EMAIL}","${req.body.PASSWORD}","CUSTOMER")`, (error, result) => {
        if (error) {
            console.log(error);
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
        }
        else {
            con.query(`INSERT INTO customer_primary_data (customer_name, birthday, contact_number,email_id,about) VALUES ("${req.body.NAME}", ${req.body.BIRTHDAY},${req.body.PHONE},"${req.body.EMAIL}","${req.body.ABOUT}")`, (error, result) => {
                if (error) {
                    console.log(error);
                    //res.setHeader(CONTENT_TYPE, APP_JSON);
                    res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
                }
                else {
                    console.log(JSON.stringify(result));
                    //res.setHeader(CONTENT_TYPE, APP_JSON);
                    res.status(RES_SUCCESS).end(JSON.stringify(result));
                }
            })

        }
    });

}




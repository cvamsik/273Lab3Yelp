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



module.exports.login = (req, res) => {
    console.log("Inside Login POST service");
    console.log("req body" + JSON.stringify(req.body));

    con.query(`SELECT * FROM login_credentials WHERE email_id="${req.body.username}"`, (error, result) => {
        console.log(JSON.stringify(result[0].user_type) + " --->>> " + req.body.password);
        if (error) {
            console.log(error);
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
        }
        else if (result[0] !== undefined) {
            // console.log(result + " --->>> " + req.body.password);
            if (result[0].user_password === (req.body.password)) {
                console.log(JSON.stringify(result));
                //res.setHeader(CONTENT_TYPE, APP_JSON);
                res.status(RES_SUCCESS).send({
                    user_type: result[0].user_type
                });
            }
            else {
                res.status(RES_BAD_REQUEST).end(JSON.stringify(error));
            }
        }
        else {
            res.status(RES_BAD_REQUEST).end(JSON.stringify(error));
        }


    });


}

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

const multer = require('multer');
const kafka = require('../kafka/client')


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

    kafka.make_request('customer', {
        api: "GET_CUSTOMER_PROFILE",
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

module.exports.createCustomer = (req, res) => {
    console.log("Inside Customer Create POST service");
    console.log("req body" + JSON.stringify(req.body));
    kafka.make_request('customer', {
        api: "POST_CUSTOMER_SIGNUP",
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

    // con.query(
    //     `BEGIN;
    //     INSERT INTO login_credentials (email_id,user_password,user_type) VALUES ("${req.body.EMAIL}","${req.body.PASSWORD}","1");
    //     INSERT INTO customer_primary_data (customer_name, birthday, contact_number,email_id,about) VALUES ("${req.body.NAME}", "${req.body.BIRTHDAY}",${req.body.PHONE},"${req.body.EMAIL}","${req.body.ABOUT}");
    //     INSERT INTO customer_secondary_data (customer_id,things_loved,find_me,blog_ref,singup_date ) VALUES(LAST_INSERT_ID(),"${req.body.THINGS_LOVED}","${req.body.FIND_ME}","${req.body.BLOG_REF}",CURDATE());
    //     INSERT INTO profile_images (user_email,image_path) VALUES ("${req.body.EMAIL}"," ");
    //     COMMIT; `
    //     , (error, result) => {
    //         if (error) {
    //             console.log(error);
    //             //res.setHeader(CONTENT_TYPE, APP_JSON);
    //             con.rollback();
    //             res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
    //         }
    //         else {
    //             console.log(JSON.stringify(result));
    //             //res.setHeader(CONTENT_TYPE, APP_JSON);
    //             res.status(RES_SUCCESS).end(JSON.stringify(result));
    //         }
    //     });



}






module.exports.updateCustomerProfile = (req, res) => {
    console.log("Inside Customer Update Profile service");
    console.log("req body" + JSON.stringify(req.body));
    kafka.make_request('customer', {
        api: "UPDATE_CUSTOMER_PROFILE",
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



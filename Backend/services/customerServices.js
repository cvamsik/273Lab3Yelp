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
    con.query(`SELECT * FROM customer_primary_data c1
     INNER JOIN customer_secondary_data c2 ON c1.customer_id=c2.customer_id 
     INNER JOIN profile_images p ON p.user_email=c1.email_id
     WHERE c1.email_id="${req.query.email_id}" ORDER BY p.image_path DESC LIMIT 1 `, (error, result) => {
        if (error) {
            console.log(error);
            //res.setHeader(CONTENT_TYPE, APP_JSON);
            con.rollback();
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


    con.query(
        `BEGIN;
        INSERT INTO login_credentials (email_id,user_password,user_type) VALUES ("${req.body.EMAIL}","${req.body.PASSWORD}","1");
        INSERT INTO customer_primary_data (customer_name, birthday, contact_number,email_id,about) VALUES ("${req.body.NAME}", "${req.body.BIRTHDAY}",${req.body.PHONE},"${req.body.EMAIL}","${req.body.ABOUT}");
        INSERT INTO customer_secondary_data (customer_id,things_loved,find_me,blog_ref,singup_date ) VALUES(LAST_INSERT_ID(),"${req.body.THINGS_LOVED}","${req.body.FIND_ME}","${req.body.BLOG_REF}",CURDATE());
        INSERT INTO profile_images (user_email) VALUES (${req.body.EMAIL});
        COMMIT; `
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
                res.status(RES_SUCCESS).end(JSON.stringify(result));
            }
        });



    // con.query(`INSERT INTO login_credentials (email_id,user_password,user_type) VALUES ("${req.body.EMAIL}","${req.body.PASSWORD}","1")`.then((result) => {
    //         con.query(`INSERT INTO customer_primary_data (customer_name, birthday, contact_number,email_id,about) VALUES ("${req.body.NAME}", "${req.body.BIRTHDAY}",${req.body.PHONE},"${req.body.EMAIL}","${req.body.ABOUT}")`, (error, result) => {

    //             else {
    //                 con.query(`INSERT INTO customer_secondary_data (customer_name, birthday, contact_number,email_id,about) VALUES ("${req.body.NAME}", "${req.body.BIRTHDAY}",${req.body.PHONE},"${req.body.EMAIL}","${req.body.ABOUT}")`, (error, result) => {

    //                 console.log(JSON.stringify(result));
    //                 //res.setHeader(CONTENT_TYPE, APP_JSON);
    //                 res.status(RES_SUCCESS).end(JSON.stringify(result));
    //             }
    //         })

    //     }
    // });



    // if (error) {
    //     console.log(error);
    //     //res.setHeader(CONTENT_TYPE, APP_JSON);
    //     res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
    // }

}






module.exports.updateCustomerProfile = (req, res) => {
    console.log("Inside Customer Update Profile service");
    console.log("req body" + JSON.stringify(req.body));


    con.query(
        `BEGIN;
        UPDATE customer_primary_data SET birthday="${req.body.birthday}", contact_number="${req.body.contact_number}",about="${req.body.about}" WHERE email_id="req.body.email_id";
        UPDATE customer_secondary_data SET things_loved="${req.body.things_loved}",find_me="${req.body.find_me}",blog_ref="${req.body.blog_ref}"  WHERE email_id="req.body.email_id";
        COMMIT; `
        , (error, result) => {
            if (error) {
                console.log(error);
                con.rollback();
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



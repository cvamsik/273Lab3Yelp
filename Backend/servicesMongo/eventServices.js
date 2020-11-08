const { response } = require('express');
// const con = require('../config/dbConnection');
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

const kafka = require('../kafka/client')
const S3 = require('./s3Operations')
const fs = require('fs')
const path = require('path');
const multer = require('multer');


module.exports.getAllEvents = (req, res) => {

    console.log("Inside Events GET all service");
    console.log(req.query)
    kafka.make_request('events', {
        api: "GET_ALL_EVENTS",
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



module.exports.registerEvent = (req, res) => {

    console.log("Inside Events POST registration service");
    console.log(req.body)

    kafka.make_request('events', {
        api: "POST_EVENT_REGISTRATION",
        body: req.body
    }, function (error, result) {
        console.log('in result');
        console.log(result);
        if (result === "Error") {
            console.log("Inside err");
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
        } else {
            console.log("Inside else");
            res.status(RES_SUCCESS).send(JSON.stringify(result));
        }

    });

}



module.exports.createEvent = async (req, res) => {

    console.log("Inside Events POST create service");
    console.log(req.body)

    // kafka.make_request('events', {
    //     api: "POST_EVENT",
    //     body: req.body
    // }, function (error, result) {
    //     console.log('in result');
    //     console.log(result);
    //     if (error) {
    //         console.log("Inside err");
    //         res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
    //     } else {
    //         console.log("Inside else");
    //         res.status(RES_SUCCESS).send(JSON.stringify(result));
    //     }

    // });
    try {


        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, './assets')
            },
            filename: function (req, file, cb) {

                cb(null, Date.now() + '-' + file.originalname)
            }
        })

        var upload = multer({ storage: storage }).array('file')


        await upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err)
            } else if (err) {
                return res.status(500).json(err)
            }
            // console.log(res)
            let urls = []
            const loop = async () => {
                for (let file of req.files) {
                    await S3.fileupload(process.env.AWS_S3_BUCKET_NAME, "events", file).then((url) => {
                        urls.push(url)
                        console.log(url)
                    })
                }
            }
            loop().then(() => {
                kafka.make_request('events', {
                    api: "POST_EVENT",
                    body: { data: req.body, urls: urls }
                }, function (error, result) {
                    console.log('in result');
                    console.log(result);
                    if (error) {
                        console.log("Inside err");
                        res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
                    } else {
                        console.log("Inside else Reviews");
                        fs.readdir('./assets', (err, files) => {
                            if (err) throw err;

                            for (const file of files) {
                                fs.unlink(path.join('./assets', file), err => {
                                    if (err) throw err;
                                });
                            }
                        });
                        res.status(RES_SUCCESS).send(JSON.stringify(result));
                    }

                });

            })


        })
    }
    catch (error) {
        console.log(error);
        res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
    }

}



module.exports.getEventsByRestaurantID = (req, res) => {

    console.log("Inside Events GET by restaurantID service");
    console.log(req.query)

    kafka.make_request('events', {
        api: "GET_EVENT_BY_RESTAURANT",
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


module.exports.getRegistrationsByCustomerID = (req, res) => {

    console.log("Inside Events GET registrations by customer service");
    console.log(req.query)

    kafka.make_request('events', {
        api: "GET_REGISTRATIONS_CUSTOMER",
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


module.exports.getRegistrationsByEventId = (req, res) => {

    console.log("Inside Events GET registrations by eventid service");
    console.log(req.query)

    kafka.make_request('events', {
        api: "GET_REGISTRATIONS_EVENT",
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

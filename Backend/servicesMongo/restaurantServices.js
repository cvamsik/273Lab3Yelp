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
const multer = require('multer');
const fs = require('fs')
const path = require('path');


module.exports.createRestaurant = (req, res) => {
    console.log("Inside Restaurant Create POST service");
    console.log("req body" + JSON.stringify(req.body));
    kafka.make_request('restaurant', {
        api: "POST_RESTAURANT_SIGNUP",
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


module.exports.getMenuByEmail = (req, res) => {
    console.log("Inside Restaurant GET menu by res email service");
    console.log(req.query)
    kafka.make_request('restaurant', {
        api: "GET_RESTAURANT_MENU",
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


module.exports.getAllRestaurants = (req, res) => {
    console.log("Inside Restaurant GET menu service");
    console.log(req.query)

    kafka.make_request('restaurant', {
        api: "GET_ALL_RESTAURANTS",
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

module.exports.getRestaurantProfile = (req, res) => {
    console.log("Inside Restaurant GET Profile service");
    console.log(req.query)

    kafka.make_request('restaurant', {
        api: "GET_RESTAURANT_PROFILE",
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



module.exports.updateRestaurantProfile = (req, res) => {
    console.log("Inside Restaurant PUT profile service");
    console.log("req body" + JSON.stringify(req.body));

    kafka.make_request('restaurant', {
        api: "UPDATE_RESTAURANT_PROFILE",
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




module.exports.updateMenuItem = async (req, res) => {
    console.log("Inside Restaurant PUT menuItem service");
    console.log("req body" + JSON.stringify(req.body));


    kafka.make_request('restaurant', {
        api: "UPDATE_MENU_ITEM",
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


module.exports.createMenuItem = async (req, res) => {
    console.log("Inside Restaurant POST menuItem service");
    console.log("req body" + JSON.stringify(req.body));
    let filename = `MenuItem_${Date.now()}.jpg`;

    try {

        const storage = multer.diskStorage({
            destination(req, file, cb) {
                cb(null, './assets');
            },
            filename(req, file, cb) {
                console.log(req.body)
                cb(null, `${filename}`);
            },
        });

        const upload = multer({
            storage
        }).single('file');

        await upload(req, res, (err) => {
            // email_id = req.body.email_id
            // filename = `${email_id}_${Date.now()}.jpg`;
            console.log("In upload" + JSON.stringify(req.body))
            if (err instanceof multer.MulterError) {
                return res.status(500);
            }
            if (err) {
                return res.status(500);
            }

            S3.fileupload(process.env.AWS_S3_BUCKET_NAME, "menu", req.file).then((url) => {
                console.log(url)
                kafka.make_request('restaurant', {
                    api: "POST_MENU_ITEM",
                    body: { ...req.body, image_url: url }
                }, function (err, results) {
                    console.log('in result');
                    console.log(results);
                    if (err) {
                        console.log("Inside err");
                        res.json({
                            status: "error",
                            msg: "System Error, Try Again."
                        })
                    } else {
                        console.log("Inside else");
                        fs.unlink(`./assets/${filename}`, (err) => {
                            if (err) {
                                console.error(err)
                                return
                            }
                        }
                        )
                        res.json(results);

                        res.end();
                    }

                });
            })


        });

    } catch (error) {
        console.log(error);
        res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
    }



    // kafka.make_request('restaurant', {
    //     api: "POST_MENU_ITEM",
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




}


module.exports.getRestaurantSearch = (req, res) => {
    console.log("Inside Restaurant GET Search service");
    console.log(req.query)


    kafka.make_request('restaurant', {
        api: "GET_RESTAURANT_SEARCH",
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
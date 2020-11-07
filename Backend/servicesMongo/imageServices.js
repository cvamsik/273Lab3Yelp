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
const uploadToS3 = require('./uploadToS3');
const { json } = require('body-parser');
const S3 = require('./s3Operations')
const fs = require('fs')
const path = require('path');

// const upload = require("./upload/multerUpload");


// module.exports.getProfileImage = (req, res) => {
//     console.log("Inside Image GET profile service");
//     console.log("req params" + JSON.stringify(req.query));


//     const { fileid } = req.params;
//     res.sendFile(+ '/data/' + fileid);
//     con.query(`SELECT image_path FROM customer_primary_data c1 INNER JOIN customer_secondary_data c2 ON c1.customer_id=c2.customer_id WHERE c1.email_id="${req.query.email_id}"`, (error, result) => {
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

// }



module.exports.uploadUserProfile = async (req, res) => {
    console.log("Inside image POST profile service" + JSON.stringify(req.body));
    let email_id;
    let filename = `Profile_${Date.now()}.jpg`;
    let pathname = '/imageData/UserProfiles/'
    let userRequestObject = req.body;

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

            S3.fileupload(process.env.AWS_S3_BUCKET_NAME, "profiles", req.file).then((url) => {
                console.log(url)
                kafka.make_request('images', {
                    api: "POST_IMAGE_USER_PROFILE",
                    body: { ...req.body, imageUrl: url }
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

}


module.exports.uploadMenuItem = async (req, res) => {
    console.log("Inside image POST Dish Item service");
    let email_id;
    let filename = `Dish_${Date.now()}.jpg`;
    let pathname = '/imageData/Dishes/'

    try {

        const storage = multer.diskStorage({
            destination(req, file, cb) {
                cb(null, './imageData/Dishes/');
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
            // console.log(filename)
            if (err instanceof multer.MulterError) {
                return res.status(500);
            }
            if (err) {
                return res.status(500);
            }
            console.log(`${pathname}${filename}`)
            res.status(RES_SUCCESS).end(`${pathname}${filename}`);
            //         con.query(`
            //         INSERT INTO profile_images(user_email,image_path) VALUES ("${req.body.email_id}","${pathname}${filename}")
            //  `, (error, result) => {
            //             if (error) {
            //                 console.log(error);
            //                 //res.setHeader(CONTENT_TYPE, APP_JSON);
            //                 con.rollback();
            //                 res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
            //             }
            //             else {
            //                 console.log(JSON.stringify(result));
            //                 //res.setHeader(CONTENT_TYPE, APP_JSON);
            //                 res.status(RES_SUCCESS).end(JSON.stringify(result));
            //             }
            //         });

        });

    } catch (error) {
        console.log(error);
        res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
    }


}


module.exports.uploadEvent = async (req, res) => {
    console.log("Inside image POST Event Item service");
    let email_id;
    let filename = `Dish_${Date.now()}.jpg`;
    let pathname = '/imageData/Events/'
    try {

        const storage = multer.diskStorage({
            destination(req, file, cb) {
                cb(null, './imageData/Events/');
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
            event_id = req.body.event_id
            // filename = `${event_id}_${Date.now()}.jpg`;
            console.log(filename)
            if (err instanceof multer.MulterError) {
                return res.status(500);
            }
            if (err) {
                return res.status(500);
            }
            console.log(`${pathname}${filename}`)
            res.status(RES_SUCCESS).end(`${pathname}${filename}`);
            con.query(`
                    INSERT INTO event_images(event_id,image_url) VALUES ("${req.body.event_id}","${pathname}${filename}")
             `, (error, result) => {
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

        });

    } catch (error) {
        console.log(error);
        res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
    }


}


// let express = require('express'),
//     multer = require('multer'),
//     mongoose = require('mongoose'),
//     uuidv4 = require('uuid/v4'),
//     router = express.Router();

// const DIR = './public/';

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './assets');
//     },
//     filename: (req, file, cb) => {
//         const fileName = file.originalname.toLowerCase().split(' ').join('-');
//         cb(null, uuidv4() + '-' + fileName)
//     }
// });

// var upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//             cb(null, true);
//         } else {
//             cb(null, false);
//             return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//         }
//     }
// });





module.exports.uploadReviews = async (req, res) => {
    console.log("Inside image POST Review Images service");
    let email_id;
    let filename = `Dish_${Date.now()}.jpg`;
    let pathname = '/imageData/Events/'
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
                    await S3.fileupload(process.env.AWS_S3_BUCKET_NAME, "reviews", file).then((url) => {
                        urls.push(url)
                        console.log(url)
                    })
                }
            }
            loop().then(() => {
                kafka.make_request('reviews', {
                    api: "POST_REVIEW_CUSTOMER",
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
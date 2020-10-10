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
    console.log("Inside image POST profile service");
    let email_id;
    let filename = `Profile_${Date.now()}.jpg`;
    let pathname = '/imageData/UserProfiles/'

    try {

        const storage = multer.diskStorage({
            destination(req, file, cb) {
                cb(null, './imageData/UserProfiles/');
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
            con.query(`
            INSERT INTO profile_images(user_email,image_path) VALUES ("${req.body.email_id}","${pathname}${filename}")
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
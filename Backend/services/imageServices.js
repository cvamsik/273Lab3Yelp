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


module.exports.getProfileImage = (req, res) => {
    console.log("Inside Image GET profile service");
    console.log("req params" + JSON.stringify(req.query));


    const { fileid } = req.params;
res.sendFile( + '/data/' + fileid); 
    con.query(`SELECT * FROM customer_primary_data c1 INNER JOIN customer_secondary_data c2 ON c1.customer_id=c2.customer_id WHERE c1.email_id="${req.query.email_id}"`, (error, result) => {
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



module.exports.uploadUserProfile = (req, res) => {
    console.log("Inside image POST profile service");
    console.log(req.body);
    let filename=""
    try {
        // console.log(req.data);

        const storage = multer.diskStorage({
            destination(req, file, cb) {
                cb(null, './imageData/UserProfiles/');
            },
            filename(req, file, cb) {
                // filename=`${file.originalname}`
                cb(null, `${file.originalname}`);
            },
        });

        const upload = multer({
            storage
        }).single('file');

        upload(req, res, (err) => {
            // console.log('In the saving part');
            if (err instanceof multer.MulterError) {
                return res.status(500);
            }
            if (err) {
                return res.status(500);
            }

            return res.status(200);
        });
 con.query(`
        INSERT INTO profile_images(user_email,)
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
    } catch (error) {
        console.log(error);
        res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
    }
    // con.query(
    //     `BEGIN;
    //     INSERT INTO customer_secondary_data (profile_image_link) VALUES(${}) WHERE customer_id=${};
    //     COMMIT; `
    //     , (error, result) => {
    //         if (error) {
    //             console.log(error);
    //             //res.setHeader(CONTENT_TYPE, APP_JSON);
    //             con.rollback();
    //             res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
    //         }
    //         else {
    //             con.rollback();
    //             console.log(JSON.stringify(result));
    //             //res.setHeader(CONTENT_TYPE, APP_JSON);
    //             res.status(RES_SUCCESS).end(JSON.stringify(result));
    //         }
    //     });

}
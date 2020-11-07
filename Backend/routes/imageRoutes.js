const express = require("express");
const imageRouter = express.Router();
const imageServices = require("../servicesMongo/imageServices");

const { GET_IMAGE_USER_PROFILE, POST_IMAGES_REVIEW, POST_IMAGE_EVENT, POST_IMAGE_MENU_ITEM, POST_IMAGE_USER_PROFILE, UPDATE_USER_IMAGE } = require('../config/routeConstants');

// imageRouter.route(GET_IMAGE_USER_PROFILE).get(imageServices.getProfileImage);
imageRouter.route(POST_IMAGE_USER_PROFILE).post(imageServices.uploadUserProfile);
imageRouter.route(POST_IMAGE_MENU_ITEM).post(imageServices.uploadMenuItem);
imageRouter.route(POST_IMAGE_EVENT).post(imageServices.uploadEvent);
imageRouter.route(POST_IMAGES_REVIEW).post(imageServices.uploadReviews);

module.exports = imageRouter;


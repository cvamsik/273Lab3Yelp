const express = require("express");
const imageRouter = express.Router();
const imageServices = require("../services/imageServices");

const { GET_IMAGE_USER_PROFILE,POST_IMAGE_USER_PROFILE,UPDATE_USER_IMAGE } = require('../config/routeConstants');

imageRouter.route(GET_IMAGE_USER_PROFILE).get(imageServices.getProfileImage);
imageRouter.route(POST_IMAGE_USER_PROFILE).post(imageServices.uploadUserProfile);

module.exports = imageRouter;


const express = require("express");
const restaurantRouter = express.Router();
const restaurantServices = require("../services/restaurantServices");


const { POST_RESTAURANT_SIGNUP } = require("../../Frontend/src/Config/routeConstants");
const { GET_RESTAURANT_MENU } = require("../config/routeConstants");

restaurantRouter.route(POST_RESTAURANT_SIGNUP).post(restaurantServices.createRestaurant);
restaurantRouter.route(GET_RESTAURANT_MENU).get(restaurantServices.getMenuByEmail);
// restaurantRouter.route(UPDATE_CUSTOMER_PROFILE).put(customerServices.updateCustomerProfile);
module.exports = restaurantRouter;
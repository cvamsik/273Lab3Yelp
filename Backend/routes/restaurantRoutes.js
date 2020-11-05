const express = require("express");
const restaurantRouter = express.Router();
const restaurantServices = require("../servicesMongo/restaurantServices");
const { checkAuth } = require("../config/passport");
var passport = require('passport');


const { UPDATE_RESTAURANT_PROFILE, POST_RESTAURANT_SIGNUP, GET_RESTAURANT_MENU, GET_RESTAURANT_SEARCH, GET_ALL_RESTAURANTS, GET_RESTAURANT_PROFILE, UPDATE_MENU_ITEM, POST_MENU_ITEM } = require("../config/routeConstants");

restaurantRouter.route(POST_RESTAURANT_SIGNUP).post(restaurantServices.createRestaurant);
restaurantRouter.get(GET_RESTAURANT_MENU, checkAuth, restaurantServices.getMenuByEmail);
restaurantRouter.route(GET_ALL_RESTAURANTS).get(restaurantServices.getAllRestaurants);
restaurantRouter.route(GET_RESTAURANT_PROFILE).get(restaurantServices.getRestaurantProfile);
restaurantRouter.route(UPDATE_RESTAURANT_PROFILE).put(restaurantServices.updateRestaurantProfile);
restaurantRouter.route(POST_MENU_ITEM).post(restaurantServices.createMenuItem);
restaurantRouter.route(UPDATE_MENU_ITEM).put(restaurantServices.updateMenuItem);
restaurantRouter.route(GET_RESTAURANT_SEARCH).get(restaurantServices.getRestaurantSearch);


// restaurantRouter.route(UPDATE_CUSTOMER_PROFILE).put(customerServices.updateCustomerProfile);
module.exports = restaurantRouter;
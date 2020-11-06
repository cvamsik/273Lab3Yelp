const express = require("express");
const orderRouter = express.Router();
const orderServices = require("../servicesMongo/orderServices");
const { checkAuth } = require("../config/passport");


const { GET_ORDER_BY_CUSTOMER, POST_ORDER, UPDATE_ORDER, GET_ORDER_BY_ID, GET_ORDER_BY_RESTAURANT } = require("../../Frontend/src/Config/routeConstants");

orderRouter.route(POST_ORDER).post(checkAuth, orderServices.createOrder);
orderRouter.route(GET_ORDER_BY_CUSTOMER).get(checkAuth, orderServices.getOrdersByCustomerID);
orderRouter.route(GET_ORDER_BY_RESTAURANT).get(checkAuth, orderServices.getOrdersByRestaurantID);
orderRouter.route(GET_ORDER_BY_ID).get(checkAuth, orderServices.getOrdersByOrderID);
orderRouter.route(UPDATE_ORDER).put(checkAuth, orderServices.updateOrderStatus);


module.exports = orderRouter;
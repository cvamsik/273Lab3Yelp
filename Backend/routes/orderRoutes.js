const express = require("express");
const orderRouter = express.Router();
const orderServices = require("../services/orderServices");


const { GET_ORDER_BY_CUSTOMER, POST_ORDER, UPDATE_ORDER, GET_ORDER_BY_ID, GET_ORDER_BY_RESTAURANT } = require("../../Frontend/src/Config/routeConstants");

orderRouter.route(POST_ORDER).post(orderServices.createOrder);
orderRouter.route(GET_ORDER_BY_CUSTOMER).get(orderServices.getOrdersByCustomerID);
orderRouter.route(GET_ORDER_BY_RESTAURANT).get(orderServices.getOrdersByRestaurantID);
orderRouter.route(GET_ORDER_BY_ID).get(orderServices.getOrdersByOrderID);
orderRouter.route(UPDATE_ORDER).put(orderServices.updateOrderStatus);


module.exports = orderRouter;
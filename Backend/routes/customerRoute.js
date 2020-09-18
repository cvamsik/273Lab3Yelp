const express = require("express");
const customerRouter = express.Router();
const customerServices = require("../services/customerServices");

const { GET_CUSTOMER_ROUTE, POST_CUSTOMER_ROUTE, UPDATE_CUSTOMER_ROUTE } = require('../config/routeConstants');

customerRouter.route(GET_CUSTOMER_ROUTE).get(customerServices.getCustomers);

module.exports = customerRouter;
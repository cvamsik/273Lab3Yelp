const express = require("express");
const customerRouter = express.Router();
const customerServices = require("../servicesSQL/customerServices");

const {
    GET_CUSTOMER_PROFILE,
    GET_ALL_CUSTOMER_PROFILES,
    POST_CUSTOMER_SIGNUP,
    UPDATE_CUSTOMER_PROFILE,
    UPDATE_CUSTOMER_IMAGE,
    POST_CUSTOMER_IMAGE
} = require('../config/routeConstants');

customerRouter.route(GET_ALL_CUSTOMER_PROFILES).get(customerServices.getAllCustomers);
customerRouter.route(GET_CUSTOMER_PROFILE).get(customerServices.getCustomer);
customerRouter.route(POST_CUSTOMER_SIGNUP).post(customerServices.createCustomer);
customerRouter.route(UPDATE_CUSTOMER_PROFILE).put(customerServices.updateCustomerProfile);
module.exports = customerRouter;
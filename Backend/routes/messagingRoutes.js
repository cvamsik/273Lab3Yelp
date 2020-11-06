const express = require("express");
const messageRouter = express.Router();
const messagingServices = require("../servicesMongo/messagingServices");
const { checkAuth } = require("../config/passport");

const { GET_MESSAGES, GET_MESSAGES_LIST_RESTAURANT, GET_MESSAGES_LIST_CUSTOMER, POST_INITIATE_MESSAGE, POST_MESSAGES } = require('../config/routeConstants');

messageRouter.route(POST_INITIATE_MESSAGE).post(checkAuth, messagingServices.initiateMessage);
messageRouter.route(POST_MESSAGES).post(checkAuth, messagingServices.postMessage);
messageRouter.route(GET_MESSAGES_LIST_RESTAURANT).get(checkAuth, messagingServices.messagesListRestaurant);
messageRouter.route(GET_MESSAGES_LIST_CUSTOMER).get(checkAuth, messagingServices.messagesListCustomer);
messageRouter.route(GET_MESSAGES).get(checkAuth, messagingServices.getMessages);


module.exports = messageRouter;
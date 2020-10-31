const express = require("express");
const messageRouter = express.Router();
const messagingServices = require("../servicesMongo/messagingServices");

const { GET_MESSAGES, GET_MESSAGES_LIST_RESTAURANT, GET_MESSAGES_LIST_CUSTOMER, POST_INITIATE_MESSAGE, POST_MESSAGES } = require('../config/routeConstants');

messageRouter.route(POST_INITIATE_MESSAGE).post(messagingServices.initiateMessage);
messageRouter.route(POST_MESSAGES).post(messagingServices.postMessage);
messageRouter.route(GET_MESSAGES_LIST_RESTAURANT).get(messagingServices.messagesListRestaurant);
messageRouter.route(GET_MESSAGES_LIST_CUSTOMER).get(messagingServices.messagesListCustomer);
messageRouter.route(GET_MESSAGES).get(messagingServices.getMessages);


module.exports = messageRouter;
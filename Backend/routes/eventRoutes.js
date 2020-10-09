const express = require("express");
const eventRouter = express.Router();
const eventServices = require("../services/eventServices");

const { GET_ALL_EVENTS, POST_EVENT_REGISTRATION, POST_EVENT, GET_REGISTRATIONS_CUSTOMER, GET_REGISTRATIONS_EVENT, GET_EVENT_BY_RESTAURANT } = require('../config/routeConstants');

eventRouter.route(GET_ALL_EVENTS).get(eventServices.getAllEvents);
eventRouter.route(GET_EVENT_BY_RESTAURANT).get(eventServices.getEventsByRestaurantID);
// eventRouter.route(GET_EVENTS_BY_CUSTOMER).get(eventServices.getEventsByCustomerID);

eventRouter.route(GET_REGISTRATIONS_CUSTOMER).get(eventServices.getRegistrationsByCustomerID);
eventRouter.route(GET_REGISTRATIONS_EVENT).get(eventServices.getRegistrationsByEventId);



eventRouter.route(POST_EVENT_REGISTRATION).post(eventServices.registerEvent);
eventRouter.route(POST_EVENT).post(eventServices.createEvent);


module.exports = eventRouter;


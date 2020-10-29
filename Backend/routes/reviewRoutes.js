const express = require("express");
const reviewRouter = express.Router();
const reviewServices = require("../servicesSQL/reviewServices");

const { GET_REVIEWS_BY_CUSTOMER, GET_REVIEWS_ID_RESTAURANT, GET_REVIEWS_BY_RESTAURANT, POST_REVIEW_CUSTOMER, UPDATE_REVIEW_CUSTOMER } = require('../config/routeConstants');

reviewRouter.route(GET_REVIEWS_BY_RESTAURANT).get(reviewServices.getReviewsByRestaurant);
reviewRouter.route(GET_REVIEWS_BY_CUSTOMER).get(reviewServices.getReviewsByCustomer);
reviewRouter.route(POST_REVIEW_CUSTOMER).post(reviewServices.postReviewCustomer);
reviewRouter.route(GET_REVIEWS_ID_RESTAURANT).get(reviewServices.getReviewsByIDRestaurant);


module.exports = reviewRouter;
const graphql = require('graphql');
const LoginCredentials = require('../models/LoginCredentials')
const { login } = require('./resolvers/Login')
const { loginType } = require('./Schemas/Login');
const { dishType, cartItem, restaurantProfile, restaurantOrderType } = require('./Schemas/Restaurants');
const { createDish, updateRestaurantProfile, searchRestaurant, restaurantUpdateOrder, getOrdersRestaurant, restaurantCreateOrder } = require('./resolvers/Restaurant');
const Dish = require('../models/Dish');
const mongoose = require("mongoose");
const { createOrder } = require('../servicesMongo/orderServices');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLFloat
} = graphql;



const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        login: {
            type: loginType,
            args: { username: { type: GraphQLString }, password: { type: GraphQLString } },
            resolve(parent, args) {
                // console.log(args)
                return LoginCredentials.findOne({ email_id: args.username })
            }
        },
        restaurantSearch: {
            type: new GraphQLList(restaurantProfile),
            args: { search_string: { type: GraphQLString } },
            resolve(parent, args) {
                // console.log(args)
                return searchRestaurant(args)
            }
        },
        restaurantOrdersList: {
            type: new GraphQLList(restaurantOrderType),
            args: { restaurant_id: { type: GraphQLString } },
            resolve(parent, args) {
                // console.log(args)
                return getOrdersRestaurant(args)
            }
        }
    }
});


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addDish: {
            type: dishType,
            args: {
                dish_name: { type: GraphQLString },
                ingredients: { type: GraphQLString },
                image_url: { type: GraphQLString },
                price: { type: GraphQLInt },
                description: { type: GraphQLString },
                category_id: { type: GraphQLString },
                restaurant_id: { type: GraphQLString }
            },
            async resolve(parent, args) {
                return createDish(args)
            }

        },
        updateRestaurantProfile: {
            type: restaurantProfile,
            args: {
                _id: { type: GraphQLNonNull(GraphQLString) },
                restaurant_location: { type: GraphQLNonNull(GraphQLString) },
                restaurant_description: { type: GraphQLNonNull(GraphQLString) },
                restaurant_address: { type: GraphQLNonNull(GraphQLString) },
                address_city: { type: GraphQLNonNull(GraphQLString) },
                address_state: { type: GraphQLNonNull(GraphQLString) },
                address_postal_code: { type: GraphQLNonNull(GraphQLInt) },
                address_latitude: { type: GraphQLNonNull(GraphQLFloat) },
                address_longitude: { type: GraphQLNonNull(GraphQLFloat) },
                primary_phone: { type: GraphQLNonNull(GraphQLInt) },
                secondary_phone: { type: GraphQLNonNull(GraphQLInt) },
                open_time: { type: GraphQLNonNull(GraphQLString) },
                close_time: { type: GraphQLNonNull(GraphQLString) },
            },
            async resolve(parent, args) {
                return updateRestaurantProfile(args);
            }
        },
        restaurantCreateOrder: {
            type: restaurantOrderType,
            args: {
                delivery_address: { type: GraphQLNonNull(GraphQLString) },
                address_city: { type: GraphQLNonNull(GraphQLString) },
                address_postal_code: { type: GraphQLNonNull(GraphQLInt) },
                address_latitude: { type: GraphQLNonNull(GraphQLInt) },
                address_longitude: { type: GraphQLNonNull(GraphQLInt) },
                primary_phone: { type: GraphQLNonNull(GraphQLInt) },
                payment_card_digits: { type: GraphQLNonNull(GraphQLInt) },
                cart_items: { type: GraphQLNonNull(GraphQLString) },
                customer_id: { type: GraphQLNonNull(GraphQLString) },
                restaurant_id: { type: GraphQLNonNull(GraphQLString) },
                order_type: { type: GraphQLNonNull(GraphQLString) },
                order_status: { type: GraphQLNonNull(GraphQLString) },
                order_total_price: { type: GraphQLNonNull(GraphQLInt) },
            },
            async resolve(parent, args) {
                return restaurantCreateOrder(args);
            }
        },
        restaurantUpdateOrder: {
            type: restaurantOrderType,
            args: {
                order_id: { type: GraphQLNonNull(GraphQLString) },
                order_status_id: { type: GraphQLNonNull(GraphQLString) },
            },
            async resolve(parent, args) {
                return restaurantUpdateOrder(args);
            }
        }

    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

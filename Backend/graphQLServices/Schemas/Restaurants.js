const graphql = require('graphql');
const Dish = require('../../models/Dish')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLFloat,
    GraphQLNonNull,
} = graphql;

module.exports.dishType = new GraphQLObjectType({
    name: 'Dish',
    fields: () => ({
        _id: { type: GraphQLNonNull(GraphQLString) },
        dish_id: { type: GraphQLNonNull(GraphQLID) },
        dish_name: { type: GraphQLNonNull(GraphQLString) },
        ingredients: { type: GraphQLNonNull(GraphQLString) },
        image_url: { type: GraphQLNonNull(GraphQLString) },
        price: { type: GraphQLNonNull(GraphQLInt) },
        description: { type: GraphQLNonNull(GraphQLString) },
        category_id: { type: GraphQLNonNull(GraphQLString) },
    })
});

module.exports.restaurantProfile = new GraphQLObjectType({
    name: 'RestaurantProfile',
    fields: () => ({
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

    })
});


module.exports.restaurantOrderType = new GraphQLObjectType({
    name: 'RestaurantOrder',
    fields: () => ({
        _id: { type: GraphQLNonNull(GraphQLString) },
        order_id: { type: GraphQLNonNull(GraphQLString) },
        customer_id: { type: GraphQLNonNull(GraphQLString) },
        restaurant_id: { type: GraphQLNonNull(GraphQLString) },
        order_type: { type: GraphQLNonNull(GraphQLString) },
        order_status: { type: GraphQLNonNull(GraphQLString) },
        order_date: { type: GraphQLNonNull(GraphQLString) },
        order_time: { type: GraphQLNonNull(GraphQLString) },
        order_total_price: { type: GraphQLNonNull(GraphQLFloat) },
        // delivery_address: { type: GraphQLNonNull(GraphQLString) },
        payment_card_digits: { type: GraphQLNonNull(GraphQLString) },
        // cart_items: { type: GraphQLNonNull(GraphQLString) },
    })
});

module.exports.cartItem = new GraphQLObjectType({
    name: 'CartItem',
    fields: () => ({
        _id: { type: GraphQLNonNull(GraphQLString) },
        dish_id: { type: GraphQLNonNull(GraphQLString) },
        count: { type: GraphQLNonNull(GraphQLInt) },
    })
});

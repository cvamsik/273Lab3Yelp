const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

module.exports.loginType = new GraphQLObjectType({
    name: 'LoginCredentials',
    fields: () => ({
        _id: { type: GraphQLString },
        user_password: { type: GraphQLString },
        email_id: { type: GraphQLString },
        user_type: { type: GraphQLInt },
    })
});



const GraphQLObjectType = require('graphql').GraphQLObjectType;
const GraphQLNonNull = require('graphql').GraphQLNonNull;
const GraphQLID = require('graphql').GraphQLID;
const GraphQLString = require('graphql').GraphQLString;
const GraphQLBoolean = require('graphql').GraphQLBoolean;

// Login Type
exports.loginType = new GraphQLObjectType({
    name: 'login',
    fields: () => {
        return {
            sucess: {
                type: GraphQLBoolean
            },
            status: {
                type: GraphQLID
            },
            name: {
                type: GraphQLString
            },
            messsage: {
                type: GraphQLString
            },
            token: {
                type: GraphQLString
            }
        }
    }
});

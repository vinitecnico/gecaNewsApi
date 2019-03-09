const GraphQLObjectType = require('graphql').GraphQLObjectType;
const GraphQLNonNull = require('graphql').GraphQLNonNull;
const GraphQLID = require('graphql').GraphQLID;
const GraphQLString = require('graphql').GraphQLString;
const GraphQLBoolean = require('graphql').GraphQLBoolean;
const GraphQLList = require('graphql').GraphQLList;

const data = new GraphQLObjectType({
    name: 'data',
    fields: () => {
        return {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            name: {
                type: new GraphQLNonNull(GraphQLString)
            },
            url: {
                type: new GraphQLNonNull(GraphQLString)
            },
            type: {
                type: new GraphQLNonNull(GraphQLString)
            },
            status: {
                type: GraphQLBoolean
            }
        }
    }
});

// newsDatabaseFilter Type
exports.newsDatabaseFilterType = new GraphQLObjectType({
    name: 'newsDatabaseFilter',
    fields: () => {
        return {
            total: {
                type: new GraphQLNonNull(GraphQLID)
            },
            data: {
                type: new GraphQLList(data)
            }
        }
    }
});

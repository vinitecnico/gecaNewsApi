const GraphQLObjectType = require('graphql').GraphQLObjectType;
const GraphQLNonNull = require('graphql').GraphQLNonNull;
const GraphQLID = require('graphql').GraphQLID;
const GraphQLString = require('graphql').GraphQLString;
const GraphQLBoolean = require('graphql').GraphQLBoolean;
const GraphQLList = require('graphql').GraphQLList;

const data = new GraphQLObjectType({
    name: 'dataNews',
    fields: () => {
        return {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            title: {
                type: new GraphQLNonNull(GraphQLString)
            },
            description: {
                type: new GraphQLNonNull(GraphQLString)
            },
            imageUrl: {
                type: GraphQLString
            },
            fileName: {
                type: GraphQLString
            },
            status: {
                type: GraphQLBoolean
            },
            showTimeMilliseconds: {
              type: GraphQLInt
            }
        }
    }
});

// news Type
exports.newsFilterType = new GraphQLObjectType({
    name: 'newsFilter',
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

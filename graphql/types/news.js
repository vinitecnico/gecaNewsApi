const GraphQLObjectType = require('graphql').GraphQLObjectType;
const GraphQLNonNull = require('graphql').GraphQLNonNull;
const GraphQLID = require('graphql').GraphQLID;
const GraphQLString = require('graphql').GraphQLString;
const GraphQLBoolean = require('graphql').GraphQLBoolean;
const GraphQLInt = require('graphql').GraphQLInt;

// news Type
exports.newsType = new GraphQLObjectType({
  name: 'news',
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
        type: new GraphQLNonNull(GraphQLString)
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

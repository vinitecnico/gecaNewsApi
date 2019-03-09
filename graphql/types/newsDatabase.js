const GraphQLObjectType = require('graphql').GraphQLObjectType;
const GraphQLNonNull = require('graphql').GraphQLNonNull;
const GraphQLID = require('graphql').GraphQLID;
const GraphQLString = require('graphql').GraphQLString;
const GraphQLBoolean = require('graphql').GraphQLBoolean;

// newsDatabase Type
exports.newsDatabaseType = new GraphQLObjectType({
  name: 'newsDatabase',
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

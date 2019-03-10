const GraphQLObjectType = require('graphql').GraphQLObjectType;
const GraphQLInt = require('graphql').GraphQLInt;

// dashboard Type
exports.dashboardType = new GraphQLObjectType({
  name: 'dashboard',
  fields: () => {
    return {
      database: {
        type: GraphQLInt
      },
      news: {
        type: GraphQLInt
      }
    }
  }
});

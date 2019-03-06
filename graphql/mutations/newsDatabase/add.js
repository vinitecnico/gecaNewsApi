const GraphQLNonNull = require('graphql').GraphQLNonNull;
const GraphQLString = require('graphql').GraphQLString;
const GraphQLBoolean = require('graphql').GraphQLBoolean;
const NewsDatabaseType = require('../../types/newsDatabase');
const NewsDatabaseModel = require('../../../models/newsDatabase');

exports.add = {
  type: NewsDatabaseType.newsDatabaseType,
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    url: {
      type: new GraphQLNonNull(GraphQLString),
    },
    status: {
      type: GraphQLBoolean
    }
  },
  resolve(root, params) {
    const uModel = new NewsDatabaseModel(params);
    const newDataBase = uModel.save();
    if (!newDataBase) {
      throw new Error('Error');
    }
    return newDataBase
  }
}
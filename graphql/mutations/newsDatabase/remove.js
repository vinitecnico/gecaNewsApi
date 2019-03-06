const GraphQLNonNull = require('graphql').GraphQLNonNull;
const GraphQLString = require('graphql').GraphQLString;
const NewsDatabaseType = require('../../types/newsDatabase');
const NewsDatabaseModel = require('../../../models/newsDatabase');

exports.remove = {
  type: NewsDatabaseType.newsDatabaseType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve(root, params) {
    const removedDatabase = NewsDatabaseModel.findByIdAndRemove(params.id).exec();
    if (!removedDatabase) {
      throw new Error('Error')
    }
    return removedDatabase;
  }
}
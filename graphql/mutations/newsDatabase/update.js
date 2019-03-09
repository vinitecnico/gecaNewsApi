const GraphQLNonNull = require('graphql').GraphQLNonNull;
const GraphQLString = require('graphql').GraphQLString;
const GraphQLBoolean = require('graphql').GraphQLBoolean;
const moment = require('moment');
const NewsDatabaseType = require('../../types/newsDatabase');
const newsDatabaseModel = require('../../../models/newsDatabase');

exports.update = {
  type: NewsDatabaseType.newsDatabaseType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLString)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    url: {
      type: new GraphQLNonNull(GraphQLString),
    },
    type: {
      type: new GraphQLNonNull(GraphQLString),
    },
    status: {
      type: GraphQLBoolean,
    }
  },
  resolve(root, params) {
    return newsDatabaseModel.findByIdAndUpdate(
      params.id,
      { $set: { name: params.name, url: params.url, status:  params.status, type: params.type, lastUpdateDate: moment()} },
      { new: true }
    )
      .catch(err => new Error(err));
  }
}

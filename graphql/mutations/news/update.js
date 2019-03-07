const GraphQLNonNull = require('graphql').GraphQLNonNull;
const GraphQLString = require('graphql').GraphQLString;
const GraphQLBoolean = require('graphql').GraphQLBoolean;
const moment = require('moment');
const NewsType = require('../../types/news');
const newsModel = require('../../../models/news');

exports.update = {
  type: NewsType.newsType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLString)
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
    }
  },
  resolve(root, params) {
    return newsModel.findByIdAndUpdate(
      params.id,
      { $set: { title: params.title, description: params.description, imageUrl: params.imageUrl, status:  params.status, lastUpdateDate: moment()} },
      { new: true }
    )
      .catch(err => new Error(err));
  }
}

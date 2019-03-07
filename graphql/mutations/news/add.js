const GraphQLNonNull = require('graphql').GraphQLNonNull;
const GraphQLString = require('graphql').GraphQLString;
const GraphQLBoolean = require('graphql').GraphQLBoolean;
const moment = require('moment');
const NewsType = require('../../types/news');
const NewsModel = require('../../../models/news');

exports.add = {
  type: NewsType.newsType,
  args: {
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
    params.createDate = moment();
    params.lastUpdateDate = moment();
    const uModel = new NewsModel(params);
    const news = uModel.save();
    if (!news) {
      throw new Error('Error');
    }
    return news
  }
}
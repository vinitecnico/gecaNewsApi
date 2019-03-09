const GraphQLNonNull = require('graphql').GraphQLNonNull;
const GraphQLString = require('graphql').GraphQLString;
const GraphQLInt = require('graphql').GraphQLInt;
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
const GraphQLNonNull = require('graphql').GraphQLNonNull;
const GraphQLString = require('graphql').GraphQLString;
const NewsType = require('../../types/news');
const NewsModel = require('../../../models/news');

exports.remove = {
  type: NewsType.newsType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve(root, params) {
    const removedNews = NewsModel.findByIdAndRemove(params.id).exec();
    if (!removedNews) {
      throw new Error('Error')
    }
    return removedNews;
  }
}
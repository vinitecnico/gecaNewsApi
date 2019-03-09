const GraphQLNonNull = require('graphql').GraphQLNonNull;
const GraphQLString = require('graphql').GraphQLString;
const GraphQLInt = require('graphql').GraphQLInt;
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
    return newsModel.findByIdAndUpdate(
      params.id,
      {
        $set: {
          title: params.title, description: params.description, imageUrl: params.imageUrl, fileName: params.fileName,
          status: params.status, showTimeMilliseconds: params.showTimeMilliseconds, lastUpdateDate: moment()
        }
      },
      { new: true }
    )
      .catch(err => new Error(err));
  }
}

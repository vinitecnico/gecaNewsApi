var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
const NewsType = require('../../types/news');
const NewsModel = require('../../../models/news');

exports.getById = {
    type: NewsType.newsType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve(root, params) {
        const news = NewsModel.findById(params.id).exec();
        if (!news) {
            throw new Error('user not found!');
        }
        return news
    }
}
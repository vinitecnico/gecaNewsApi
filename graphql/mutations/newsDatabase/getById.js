var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
const NewsDatabaseType = require('../../types/newsDatabase');
const NewsDatabaseModel = require('../../../models/newsDatabase');

exports.getById = {
    type: NewsDatabaseType.newsDatabaseType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve(root, params) {
        const newsDatabase = NewsDatabaseModel.findById(params.id).exec();
        if (!newsDatabase) {
            throw new Error('user not found!');
        }
        return newsDatabase
    }
}
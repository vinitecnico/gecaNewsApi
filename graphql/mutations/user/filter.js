var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var UserType = require('../../types/user');
var UserModel = require('../../../models/user');

exports.filter = {
    type: UserType.userType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve(root, params) {
        const user = UserModel.findById(params.id).exec();
        if (!user) {
            throw new Error('user not found!');
        }
        return user
    }
}
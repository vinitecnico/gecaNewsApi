const GraphQLNonNull = require('graphql').GraphQLNonNull;
const GraphQLString = require('graphql').GraphQLString;
const md5 = require('md5');
const UserType = require('../../types/user');
const UserModel = require('../../../models/user');

exports.login = {
    type: UserType.userType,
    args: {
        email: {
            type: new GraphQLNonNull(GraphQLString),
        },
        password: {
            type: new GraphQLNonNull(GraphQLString),
        }
    },
    resolve(root, params) {
        const user = UserModel.findOne({ email: params.email, password: md5(params.password) }).exec();
        if (!user) {
            throw new Error('user not found!');
        }
        return user
    }
}
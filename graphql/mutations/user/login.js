const GraphQLNonNull = require('graphql').GraphQLNonNull;
const GraphQLString = require('graphql').GraphQLString;
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const LoginType = require('../../types/login');
const UserModel = require('../../../models/user');
const config = require('../../../config/config');

exports.login = {
    type: LoginType.loginType,
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
        return user
            .then((response) => {
                let obj = {};
                if (response) {
                    obj = {
                        sucess: true,
                        status: 200,
                        name: response.name,
                        messsage: 'Usuário Autenticado com Sucesso!',
                        token: jwt.sign({email: response.email, name: response.name}, config.configName, { expiresIn: config.expireInTime })
                    }
                } else {
                    obj = {
                        sucess: false,
                        status: 403,
                        messsage: 'Autenticação do Usuário falhou. Senha incorreta!',
                        token: "Não há token."
                    }
                }

                return obj;
            })
            .catch((e) => {
                console.log(e);
            });
    }
}
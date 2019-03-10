'use strict';

const md5 = require('md5');
const jwt = require('jsonwebtoken');
const cors = require("cors");
const config = require('../config/config');

module.exports = function (app, mongo) {
    app.post('/api/login', cors(), function (req, res) {
        const params = req.body;
        const user = { email: params.username, password: md5(params.password) };
        mongo.then((db) => {            
            const login = db.models.user.findOne(user).exec();

            return login.then((response) => {
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

                res.status(obj.status).json(obj);
            })
            .catch((e) => {
                console.log(e);
            });
            
        });
    });
};
'use strict';

const Q = require('q');
const _ = require("lodash");
const httpRequest = require('request');

module.exports = function (app, mongo) {

    const getJSONItems = (urlDatabase) => {
        const defer = Q.defer();

        const clientServerOptions = {
            uri: urlDatabase,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        httpRequest(clientServerOptions, (error, response, body) => {
            if (error) {
                return defer.resolve();
            } else {
                return defer.resolve(JSON.parse(body));
            }
        });

        return defer.promise;
    }

    app.get('/api/news', function (req, res) {
        mongo.then((db) => {
            let data = [];
            let databases = [];

            const news = db.models.news.find({ status: true }).exec()
                .then((request) => {
                    data = request;
                    return data;
                });
            const newsDatabases = db.models.newsDatabases.find({ status: true }).exec()
                .then((data) => {
                    databases = data;
                    return data;
                });

            const promises = [];
            return Q.all([news, newsDatabases])
                .then(() => {
                    _.each(databases, (x) => {
                        if (x.type == 'JSON') {
                            promises.push(getJSONItems(x.url));
                        }
                    });

                    return Q.all(promises)
                        .then((databases) => {
                            if (databases) {
                                _.each(databases, (x) => {
                                    if (x.articles && x.articles.length > 0) {
                                        _.each(x.articles, (y) => {
                                            const item = {
                                                title: y.title,
                                                description: y.description,
                                                imageUrl: y.urlToImage,
                                                fileName: null,
                                                status: true,
                                                showTimeMilliseconds: 1000,
                                                createDate: null,
                                                lastUpdateDate: null
                                            }
                                            data.push(item);
                                        });
                                    }
                                });
                            }
                            res.status(200).json(data);
                        });


                }).catch((e) => {
                    console.log(e)
                });

        });
    });
};
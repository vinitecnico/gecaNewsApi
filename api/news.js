'use strict';

const Q = require('q');
const _ = require("lodash");
const httpRequest = require('request');
const convert = require('xml-js');

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

    const getXMLItems = (urlDatabase) => {
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
                const result = JSON.parse(convert.xml2json(body, { compact: true, spaces: 4 }));
                const items = result && result.rss && result.rss.channel && result.rss.channel.item ?
                    result.rss.channel.item : result;
                const data = [];
                _.each(items, (x) => {
                    const item = {
                        title: x.title ? x.title._cdata : null,
                        description: x.description ? x.description._text : null,
                        imageUrl: x['media:content'] && x['media:content']._attributes && x['media:content']._attributes.url ?
                            x['media:content']._attributes.url : null,
                        fileName: null,
                        status: true,
                        showTimeMilliseconds: 1000,
                        createDate: null,
                        lastUpdateDate: null,
                        author: 'UOL'
                    }
                    data.push(item);
                });
                return defer.resolve(data);
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
                        } else {
                            if (x.name == 'UOL') {
                                promises.push(getXMLItems(x.url));
                            }
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
                                                lastUpdateDate: null,
                                                author: y.author
                                            }
                                            data.push(item);
                                        });
                                    } else {
                                        data = _.concat(data, x);
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
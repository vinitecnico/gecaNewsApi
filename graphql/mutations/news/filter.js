const GraphQLString = require('graphql').GraphQLString;
const GraphQLInt = require('graphql').GraphQLInt;
const Q = require('q');
const _ = require("lodash");
const NewsFilterType = require('../../types/newsFilter');
const NewsModel = require('../../../models/news');

exports.filter = {
    type: NewsFilterType.newsFilterType,
    args: {
        value: {
            type: GraphQLString
        },
        page: {
            type: GraphQLString
        },
        perPage: {
            type: GraphQLString
        },
        active: {
            type: GraphQLString
        },
        direction: {
            type: GraphQLString
        },
        status: {
            type: GraphQLString
        }
    },
    resolve(root, params) {
        const promises = [];
        const sort = {
            active: params.active || 'name',
            direction: params.direction ? params.direction : 'asc'
        };
        const pagination = {
            page: parseInt(params.page) || 1,
            perPage: parseInt(params.perPage) || 10
        };

        let filter = {};
        if (params.value) {
            filter = {
                $or: [
                    { "title": { "$regex": params.value, "$options": "i" } },
                    { "url": { "$regex": params.value, "$options": "i" } }
                ]
            };
        }

        if(params.status && params.status != 'all') {
            filter.status = params.status == 0 ? false : true;
        }
        
        promises.push(NewsModel.countDocuments(filter).exec());
        promises.push(NewsModel.find(filter)
            .skip((pagination.perPage * pagination.page) - pagination.perPage)
            .limit(pagination.perPage)
            .sort(sort.direction != 'asc' ? '-' + sort.active : sort.active)
            .exec());

        return Q.all(promises)
            .then((data) => {
                let result = {};
                _.each(data, (x) => {
                    if (_.isArray(x)) {
                        result.data = x;
                    } else {
                        result.total = x;
                    }
                });
                return result;
            }).catch((e) => {
                console.log(e)
            });
    }
}
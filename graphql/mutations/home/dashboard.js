const GraphQLString = require('graphql').GraphQLString;
const GraphQLInt = require('graphql').GraphQLInt;
const Q = require('q');
const _ = require("lodash");
const DashboardType = require('../../types/dashboard');
const NewsModel = require('../../../models/news');
const NewsDatabaseModel = require('../../../models/newsDatabase');

exports.dashboard = {
    type: DashboardType.dashboardType,
    args: {},
    resolve(root, params) {
        const promises = {};
        const obj = {};
        
        const news = NewsModel.countDocuments().exec()
        .then((data) => {
            obj.news = data;
            return data;
        });

        const database = NewsDatabaseModel.countDocuments().exec()
        .then((data) => {
            obj.database= data;
            return data;
        });

        return Q.all([news, database])
            .then(() => {
                return obj;
            }).catch((e) => {
                console.log(e)
            });
    }
}
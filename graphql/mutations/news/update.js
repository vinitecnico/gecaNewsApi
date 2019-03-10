const GraphQLNonNull = require('graphql').GraphQLNonNull;
const GraphQLString = require('graphql').GraphQLString;
const GraphQLInt = require('graphql').GraphQLInt;
const GraphQLBoolean = require('graphql').GraphQLBoolean;
const moment = require('moment');
const NewsType = require('../../types/news');
const newsModel = require('../../../models/news');
const Q = require('Q');
const fetch = require('isomorphic-fetch');
const Dropbox = require('dropbox').Dropbox;
const config = require('../../../config/config');
const dbx = new Dropbox({ accessToken: config.keyDropbox, fetch: fetch });

const deleteFile = (db, id, fileName) => {
  const defer = Q.defer();
  db.findById(id).exec()
    .then((data) => {
      if (data && data.fileName && data.fileName != fileName) {
        dbx.filesDelete({ path: `/gecanews/${data.fileName}` })
          .then((result) => {
            defer.resolve(true);
          })
          .catch((error) => {
            defer.resolve(false);
          });
      } else {
        defer.resolve(true);
      }
    });
  return defer.promise;
}

exports.update = {
  type: NewsType.newsType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLString)
    },
    title: {
      type: new GraphQLNonNull(GraphQLString)
    },
    description: {
      type: new GraphQLNonNull(GraphQLString)
    },
    imageUrl: {
      type: GraphQLString
    },
    fileName: {
      type: GraphQLString
    },
    status: {
      type: GraphQLBoolean
    },
    showTimeMilliseconds: {
      type: GraphQLInt
    }
  },
  resolve(root, params) {
    return deleteFile(newsModel, params.id, params.fileName)
      .then(() => {
        return newsModel.findByIdAndUpdate(
          params.id,
          {
            $set: {
              title: params.title, description: params.description, imageUrl: params.imageUrl, fileName: params.fileName,
              status: params.status, showTimeMilliseconds: params.showTimeMilliseconds, lastUpdateDate: moment()
            }
          },
          { new: true }
        )
          .catch(err => new Error(err));
      });
  }
}

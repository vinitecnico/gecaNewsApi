const GraphQLNonNull = require('graphql').GraphQLNonNull;
const GraphQLString = require('graphql').GraphQLString;
const NewsType = require('../../types/news');
const NewsModel = require('../../../models/news');
const Q = require('q');
const fetch = require('isomorphic-fetch');
const Dropbox = require('dropbox').Dropbox;
const config = require('../../../config/config');
const dbx = new Dropbox({ accessToken: config.keyDropbox, fetch: fetch });

const deleteFile = (db, id) => {
  const defer = Q.defer();
  db.findById(id).exec()
    .then((data) => {
      if (data && data.fileName) {
        dbx.filesDelete({ path: `/gecanews/${data.fileName}` })
          .then((result) => {
            defer.resolve(true);
          })
          .catch((error) => {
            defer.resolve(false);
          });
      }
      else {
        defer.resolve(true);
      }
    });
  return defer.promise;
}

exports.remove = {
  type: NewsType.newsType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve(root, params) {
    return deleteFile(NewsModel, params.id)
      .then(() => {
        const removedNews = NewsModel.findByIdAndRemove(params.id).exec();
        if (!removedNews) {
          throw new Error('Error')
        }
        return removedNews;
      });
  }
}
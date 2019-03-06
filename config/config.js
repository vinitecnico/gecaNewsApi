module.exports = {
    development: {
        db: 'mongodb://127.0.0.1/graphql',
        app: {
            name: 'graphql'
        }
    },
    production: {
        db: 'mongodb://sa:rbrb2019@ds161335.mlab.com:61335/gecanews',
        app: {
            name: 'rbmania'
        }
    }
};

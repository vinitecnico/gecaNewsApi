const express = require("express");
const mongoose = require('./config/mongoose');
const graphqlHTTP = require("express-graphql");
const cors = require("cors");
const db = mongoose();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({origin: '*'}));

app.use(function (req, res, next) {
  if (req.originalUrl.indexOf('login') < 0 && req.originalUrl.indexOf('news') < 0) {
    const tokens = req.headers['authorization'].replace('Bearer ', '');
    if (tokens) {
      jwt.verify(tokens, require("./config/config").configName, (err, decoded) => {
        if (err) {
          return res.status(403).send({
            success: false,
            message: 'Falha ao tentar autenticar o token!'
          });
        } else {
          //se tudo correr bem, salver a requisição para o uso em outras rotas
          req.decoded = decoded;
          next();
        }
      });

    } else {
      //se não tiver o token, retornar o erro 403
      return res.status(403).send({
        success: false,
        message: 'Não há token.'
      });
    }
  } else {
    next();
  }
});

const querySchema = require('./graphql/index').querySchema;
app.use('/graphql', cors({origin: '*'}), graphqlHTTP({
  schema: querySchema,
  rootValue: global,
  graphiql: true
}));

require('./api/login')(app, db);
require('./api/uploadfile')(app);
require('./api/news')(app, db);

// Up and Running at Port 4000
app.listen(process.env.PORT || 4000, () => {
  console.log('A GraphQL API running at port 4000');
});

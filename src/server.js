var express = require("express");
var { graphqlHTTP } = require("express-graphql");
const cors = require("cors");

const schema = require("./schema");
const sequelize = require("./database");

var app = express();
sequelize.sync();

app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    pretty: true,
    graphiql: true,
  })
);

const server = app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");

module.exports = server;

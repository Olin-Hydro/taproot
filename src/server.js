var express = require("express");
var { graphqlHTTP } = require("express-graphql");

const schema = require("./schema");

var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    // GraphQL’s data schema
    schema: schema,
    // Pretty Print the JSON response
    pretty: true,
    // Enable GraphiQL dev tool
    graphiql: true,
  })
);

app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");

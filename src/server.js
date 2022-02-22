var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");

var schema = buildSchema(`
  input LogInput {
    type: String!
    data: String!
  }
  type Log {
    id: ID!
    type: String!
    data: String!
  }
  type PhLogs {
    all: [Float]
    latest(timestamp: String): Float
  }
  type Query {
    ph: PhLogs
  }
  type Mutation {
    createLog(input: LogInput!): Log!
  }
`);

class Log {
  constructor(id, { type, data }) {
    this.id = id;
    this.type = type;
    this.data = data;
  }
}

class PhLogs {
  all() {
    return databae.ph;
  }
  latest(timestamp) {
    return databae.ph[databae.ph.length - 1];
  }
}

var databae = {
  ph: [],
};

var root = {
  ph: () => {
    return new PhLogs();
  },
  createLog: ({ input }) => {
    var id = require("crypto").randomBytes(10).toString("hex");
    console.log(input);
    databae["ph"].push(input.data);
    return new Log(id, input);
  },
};

var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");

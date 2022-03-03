const {
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLSchema,
} = require("graphql");

const phResolvers = require("./resolvers/phLogs");
const ecResolvers = require("./resolvers/ecLogs");
const { ph } = require("./models/PhLog");
const { ec } = require("./models/EcLog");

const LogInput = new GraphQLInputObjectType({
  name: "LogInput",
  fields: {
    data: {
      type: GraphQLString,
      description: "Log sensor data",
    },
  },
});

const TimeStamp = new GraphQLInputObjectType({
  name: "TimeStamp",
  fields: {
    datetime: {
      type: new GraphQLNonNull(GraphQLString),
      description: "UTC Datetime in ISO format: YYYY-MM-DD HH:MM:SS",
    },
  },
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    phLogs: {
      type: new GraphQLList(ph),
      description: "List of ph logs",
      args: {
        id: {
          type: GraphQLID,
          description: "Id of a specific ph log",
        },
        startTime: {
          type: TimeStamp,
          description: "Oldest datetime of log in interval to fetch",
        },
        endTime: {
          type: TimeStamp,
          description: "Newest datetime of log in interval to fetch",
        },
      },
      resolve: async (root, args, context) => {
        return await phResolvers.getPhLogs(args);
      },
    },
    ecLogs: {
      type: new GraphQLList(ec),
      description: "List of ec logs",
      args: {
        id: {
          type: GraphQLID,
          description: "Id of a specific ec log",
        },
        startTime: {
          type: TimeStamp,
          description: "Oldest datetime of log in interval to fetch",
        },
        endTime: {
          type: TimeStamp,
          description: "Newest datetime of log in interval to fetch",
        },
      },
      resolve: async (root, args, context) => {
        return await ecResolvers.getEcLogs(args);
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createPhLog: {
      type: ph,
      args: {
        input: { type: LogInput },
      },
      resolve: async (root, args, context) => {
        return await phResolvers.createPhLog(args.input);
      },
    },
    createEcLog: {
      type: ec,
      args: {
        input: { type: LogInput },
      },
      resolve: async (root, args, context) => {
        return await ecResolvers.createEcLog(args.input);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});

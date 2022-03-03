const {
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLSchema,
  GraphQLEnumType,
} = require("graphql");

const resolvers = require("./resolvers");
const { ph } = require("./models/PhLog");

const logTypes = new GraphQLEnumType({
  name: "logTypes",
  values: {
    PH: { value: "ph" },
  },
});

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
        return await resolvers.getPhLogs(args);
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
        return await resolvers.createPhLog(args.input);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});

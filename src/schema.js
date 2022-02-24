const {
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLSchema,
} = require("graphql");

const Log = new GraphQLObjectType({
  name: "Log",
  fields: {
    id: {
      type: GraphQLID,
      description: "Unique id of log",
    },
    type: {
      type: GraphQLString,
      description: "Type of log",
    },
    data: {
      type: GraphQLString,
      description: "Sensor data",
    },
  },
});

const ph = new GraphQLObjectType({
  name: "ph",
  fields: {
    id: {
      type: GraphQLID,
      description: "Unique id of log",
    },
    type: {
      type: GraphQLString,
      description: "Type of log",
    },
    data: {
      type: GraphQLString,
      description: "Sensor data",
    },
    timestamp: {
      type: GraphQLString,
      description: "Date and time when log was created",
    },
  },
});

const LogInput = new GraphQLInputObjectType({
  name: "LogInput",
  fields: {
    type: {
      type: GraphQLString,
      description: "Type of log",
    },
    data: {
      type: GraphQLString,
      description: "Log sensor data",
    },
  },
});

const TimeStamp = new GraphQLInputObjectType({
  name: "TimeStamp",
  fields: {
    year: {
      type: GraphQLInt,
      description: "Year",
    },
    month: {
      type: GraphQLInt,
      description: "Year",
    },
    day: {
      type: GraphQLInt,
      description: "Minute",
    },
    hour: {
      type: GraphQLInt,
      description: "Hour",
    },
    minute: {
      type: GraphQLInt,
      description: "Minute",
    },
    second: {
      type: GraphQLInt,
      description: "Second",
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
        logId: {
          type: GraphQLID,
          description: "Id of a specific ph log",
        },
        all: {
          type: GraphQLBoolean,
          description: "Get all the logs?",
        },
        last: {
          type: GraphQLInt,
          description: "Get the lastest [last] number of ph logs",
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
      resolve: (root, args, context) => {
        // TODO input api
        return [1.1];
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
});

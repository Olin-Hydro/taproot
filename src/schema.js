const {
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLSchema,
  GraphQLInt,
} = require("graphql");

const phResolvers = require("./resolvers/phLogs");
const ecResolvers = require("./resolvers/ecLogs");
const tempResolvers = require("./resolvers/tempLogs");
const sysResolvers = require("./resolvers/sysParams");
const taskResolvers = require("./resolvers/taskLogs");
const { ph } = require("./models/PhLog");
const { ec } = require("./models/EcLog");
const { temp } = require("./models/TempLog");
const { sys } = require("./models/SysParams");
const { task } = require("./models/TaskLog");

const LogInput = new GraphQLInputObjectType({
  name: "LogInput",
  fields: {
    data: {
      type: GraphQLString,
      description: "Log sensor data",
    },
  },
});

const TaskInput = new GraphQLInputObjectType({
  name: "TaskInput",
  fields: {
    type: {
      type: GraphQLString,
      description: "Task type",
    },
    data: {
      type: GraphQLString,
      description: "Task data",
    },
  },
});

const SysParamInput = new GraphQLInputObjectType({
  name: "SysParamInput",
  fields: {
    phSenseInterval: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Interval in seconds to take sensor readings",
    },
    phTaskInterval: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Interval in seconds to adjust ph",
    },
    ecSenseInterval: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Interval in seconds to take sensor readings",
    },
    ecTaskInterval: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Interval in seconds to adjust ec",
    },
    tempSenseInterval: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Interval in seconds to take sensor readings",
    },
    tempTaskInterval: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Interval in seconds to adjust temp",
    },
    waterSenseInterval: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Interval in seconds to take sensor readings",
    },
    waterTaskInterval: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Interval in seconds to adjust water level",
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
    tempLogs: {
      type: new GraphQLList(temp),
      description: "List of temp logs",
      args: {
        id: {
          type: GraphQLID,
          description: "Id of a specific temp log",
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
        return await tempResolvers.getTempLogs(args);
      },
    },
    sysParams: {
      type: new GraphQLList(sys),
      description: "List of systems and their parameters",
      args: {
        id: {
          type: GraphQLID,
          description: "Id of a specific system",
        },
      },
      resolve: async (root, args, context) => {
        return await sysResolvers.getSysParams(args);
      },
    },
    taskLogs: {
      type: new GraphQLList(task),
      description: "List of task logs",
      args: {
        id: {
          type: GraphQLID,
          description: "Id of a specific system",
        },
        type: {
          type: GraphQLString,
          description: "Type of task log",
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
        return await taskResolvers.getTaskLogs(args);
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
    createTempLog: {
      type: temp,
      args: {
        input: { type: LogInput },
      },
      resolve: async (root, args, context) => {
        return await tempResolvers.createTempLog(args.input);
      },
    },
    createSystem: {
      type: sys,
      args: {
        input: { type: SysParamInput },
      },
      resolve: async (root, args, context) => {
        return await sysResolvers.createSysParams(args.input);
      },
    },
    deleteSystem: {
      type: sys,
      args: {
        id: { type: GraphQLID },
      },
      resolve: async (root, args, context) => {
        return await sysResolvers.deleteSysParams(args.id);
      },
    },
    updateSystem: {
      type: sys,
      args: {
        id: { type: GraphQLID },
        input: { type: SysParamInput },
      },
      resolve: async (root, args, context) => {
        return await sysResolvers.updateSysParams(args.id, args.input);
      },
    },
    createTaskLog: {
      type: task,
      args: {
        input: { type: TaskInput },
      },
      resolve: async (root, args, context) => {
        return await taskResolvers.createTaskLog(args.input);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});

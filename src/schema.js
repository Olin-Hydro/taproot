const {
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLFloat,
} = require("graphql");

const sysResolvers = require("./resolvers/sysParams");
const taskResolvers = require("./resolvers/taskLogs");
const sensorResolvers = require("./resolvers/sensorLogs");
const { sys } = require("./models/SysParams");
const { task } = require("./models/TaskLog");
const { sensor } = require("./models/SensorLog");

const SensorInput = new GraphQLInputObjectType({
  name: "SensorInput",
  fields: {
    type: {
      type: GraphQLString,
      description: "Log type",
    },
    data: {
      type: GraphQLFloat,
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
    phTaskLength: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Time in seconds to dispense",
    },
    ecSenseInterval: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Interval in seconds to take sensor readings",
    },
    ecTaskInterval: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Interval in seconds to adjust ec",
    },
    ecTaskLength: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Time in seconds to dispense",
    },
    tempSenseInterval: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Interval in seconds to take sensor readings",
    },
    tempTaskInterval: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Interval in seconds to adjust temp",
    },
    tempTaskLength: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Time in seconds to dispense",
    },
    waterSenseInterval: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Interval in seconds to take sensor readings",
    },
    waterTaskInterval: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Interval in seconds to adjust water level",
    },
    waterTaskLength: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Time in seconds to dispense",
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
    sensorLogs: {
      type: new GraphQLList(sensor),
      description: "List of sensor logs",
      args: {
        id: {
          type: GraphQLID,
          description: "Id of a specific ph log",
        },
        type: {
          type: GraphQLString,
          description: "Type of sensor log",
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
        return await sensorResolvers.getSensorLogs(args);
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
    createSensorLog: {
      type: sensor,
      args: {
        input: { type: SensorInput },
      },
      resolve: async (root, args, context) => {
        return await sensorResolvers.createSensorLog(args.input);
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

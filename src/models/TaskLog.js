const Sequelize = require("sequelize");
const sequelize = require("../database");
const { GraphQLID, GraphQLString, GraphQLObjectType } = require("graphql");

const TaskLog = sequelize.define("task_log", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  data: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

const task = new GraphQLObjectType({
  name: "task",
  fields: {
    id: {
      type: GraphQLID,
      description: "Unique id of log",
    },
    type: {
      type: GraphQLString,
      description: "Task type",
    },
    data: {
      type: GraphQLString,
      description: "Task data",
    },
    createdAt: {
      type: GraphQLString,
      description: "Date and time when log was created",
    },
    updatedAt: {
      type: GraphQLString,
      description: "Date and time when log was last updated",
    },
  },
});

module.exports = {
  TaskLog: TaskLog,
  task: task,
};

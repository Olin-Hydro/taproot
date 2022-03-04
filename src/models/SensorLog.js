const Sequelize = require("sequelize");
const sequelize = require("../database");
const {
  GraphQLID,
  GraphQLString,
  GraphQLObjectType,
  GraphQLFloat,
} = require("graphql");

const SensorLog = sequelize.define("sensor_log", {
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
    type: Sequelize.FLOAT,
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

const sensor = new GraphQLObjectType({
  name: "sensor",
  fields: {
    id: {
      type: GraphQLID,
      description: "Unique id of log",
    },
    type: {
      type: GraphQLString,
      description: "Type of sensor log",
    },
    data: {
      type: GraphQLFloat,
      description: "Sensor data",
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
  SensorLog: SensorLog,
  sensor: sensor,
};

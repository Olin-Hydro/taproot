const Sequelize = require("sequelize");
const sequelize = require("../database");
const {
  GraphQLID,
  GraphQLString,
  GraphQLObjectType,
  GraphQLFloat,
} = require("graphql");

const TempLog = sequelize.define("temp_log", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  temp: {
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

const temp = new GraphQLObjectType({
  name: "temp",
  fields: {
    id: {
      type: GraphQLID,
      description: "Unique id of log",
    },
    temp: {
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
  TempLog: TempLog,
  temp: temp,
};

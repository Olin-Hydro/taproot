const Sequelize = require("sequelize");
const sequelize = require("../database");
const {
  GraphQLID,
  GraphQLString,
  GraphQLObjectType,
  GraphQLFloat,
} = require("graphql");

const PhLog = sequelize.define("ph_log", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  ph: {
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

const ph = new GraphQLObjectType({
  name: "ph",
  fields: {
    id: {
      type: GraphQLID,
      description: "Unique id of log",
    },
    ph: {
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
  PhLog: PhLog,
  ph: ph,
};

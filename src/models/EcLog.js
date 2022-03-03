const Sequelize = require("sequelize");
const sequelize = require("../database");
const {
  GraphQLID,
  GraphQLString,
  GraphQLObjectType,
  GraphQLFloat,
} = require("graphql");

const EcLog = sequelize.define("ec_log", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  ec: {
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

const ec = new GraphQLObjectType({
  name: "ec",
  fields: {
    id: {
      type: GraphQLID,
      description: "Unique id of log",
    },
    ec: {
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
  EcLog: EcLog,
  ec: ec,
};

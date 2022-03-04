const Sequelize = require("sequelize");
const sequelize = require("../database");
const {
  GraphQLID,
  GraphQLString,
  GraphQLObjectType,
  GraphQLInt,
} = require("graphql");

const SysParams = sequelize.define("sys_params", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  phSenseInterval: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  phTaskInterval: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  ecSenseInterval: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  ecTaskInterval: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  tempSenseInterval: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  tempTaskInterval: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  waterSenseInterval: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  waterTaskInterval: {
    type: Sequelize.INTEGER,
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

const sys = new GraphQLObjectType({
  name: "sys",
  fields: {
    id: {
      type: GraphQLID,
      description: "Unique id of system",
    },
    phSenseInterval: {
      type: GraphQLInt,
      description: "Interval in seconds to take sensor readings",
    },
    phTaskInterval: {
      type: GraphQLInt,
      description: "Interval in seconds to adjust ph",
    },
    ecSenseInterval: {
      type: GraphQLInt,
      description: "Interval in seconds to take sensor readings",
    },
    ecTaskInterval: {
      type: GraphQLInt,
      description: "Interval in seconds to adjust ec",
    },
    tempSenseInterval: {
      type: GraphQLInt,
      description: "Interval in seconds to take sensor readings",
    },
    tempTaskInterval: {
      type: GraphQLInt,
      description: "Interval in seconds to adjust temp",
    },
    waterSenseInterval: {
      type: GraphQLInt,
      description: "Interval in seconds to take sensor readings",
    },
    waterTaskInterval: {
      type: GraphQLInt,
      description: "Interval in seconds to adjust water level",
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
  SysParams: SysParams,
  sys: sys,
};

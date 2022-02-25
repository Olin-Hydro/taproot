const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

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
module.exports = PhLog;

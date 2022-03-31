const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.MYSQL_DB,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    dialect: "mysql",
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
    },
    timezone: "-04:00",
    host: process.env.MYSQL_HOST,
  }
);
module.exports = sequelize;

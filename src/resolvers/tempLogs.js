const { Op } = require("sequelize");
const { TempLog } = require("../models/TempLog");

let getTempLogs = async function (args) {
  if (args.id != null) {
    return await [TempLog.findByPk(args.id)];
  } else if (args.startTime != null && args.endTime != null) {
    return await TempLog.findAll({
      where: {
        createdAt: {
          [Op.gt]: new Date(args.startTime.datetime),
          [Op.lt]: new Date(args.endTime.datetime),
        },
      },
    });
  }
  return await TempLog.findAll();
};

let createTempLog = async function ({ data }) {
  return await TempLog.create({ temp: data });
};

module.exports = {
  getTempLogs: getTempLogs,
  createTempLog: createTempLog,
};

const { Op } = require("sequelize");
const { PhLog } = require("../models/PhLog");

let getPhLogs = async function (args) {
  if (args.id != null) {
    return await [PhLog.findByPk(args.id)];
  } else if (args.startTime != null && args.endTime != null) {
    return await PhLog.findAll({
      where: {
        createdAt: {
          [Op.gt]: new Date(args.startTime.datetime),
          [Op.lt]: new Date(args.endTime.datetime),
        },
      },
    });
  }
  return await PhLog.findAll();
};

let createPhLog = async function ({ data }) {
  return await PhLog.create({ ph: data });
};

module.exports = {
  getPhLogs: getPhLogs,
  createPhLog: createPhLog,
};

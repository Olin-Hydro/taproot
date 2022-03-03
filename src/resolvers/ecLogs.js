const { Op } = require("sequelize");
const { EcLog } = require("../models/EcLog");

let getEcLogs = async function (args) {
  if (args.id != null) {
    return await [EcLog.findByPk(args.id)];
  } else if (args.startTime != null && args.endTime != null) {
    return await EcLog.findAll({
      where: {
        createdAt: {
          [Op.gt]: new Date(args.startTime.datetime),
          [Op.lt]: new Date(args.endTime.datetime),
        },
      },
    });
  }
  return await EcLog.findAll();
};

let createEcLog = async function ({ data }) {
  return await EcLog.create({ ec: data });
};

module.exports = {
  getEcLogs: getEcLogs,
  createEcLog: createEcLog,
};

const { Op } = require("sequelize");
const { PhLog } = require("./models/PhLog");

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

let createLog = async function ({ type, data }) {
  switch (type) {
    case "ph":
      return await PhLog.create({ ph: data });
    default:
  }
};

module.exports = {
  getPhLogs: getPhLogs,
  createLog: createLog,
};

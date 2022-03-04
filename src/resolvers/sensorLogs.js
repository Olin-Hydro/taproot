const { Op } = require("sequelize");
const { SensorLog } = require("../models/SensorLog");

let getSensorLogs = async function (args) {
  if (args.id != null) {
    return await [SensorLog.findByPk(args.id)];
  } else if (args.startTime != null && args.endTime != null) {
    if (args.type != null) {
      return await getByTypeAndDateTime(
        args.type,
        args.startTime,
        args.endTime
      );
    } else {
      return await getByDateTime(args.startTime, args.endTime);
    }
  } else if (args.type != null) {
    return await getByType(args.type);
  }
  return await SensorLog.findAll();
};

let getByType = async function (type) {
  return await SensorLog.findAll({
    where: {
      type: type,
    },
  });
};

let getByDateTime = async function (startTime, endTime) {
  return await SensorLog.findAll({
    where: {
      createdAt: {
        [Op.gt]: new Date(startTime.datetime),
        [Op.lt]: new Date(endTime.datetime),
      },
    },
  });
};

let getByTypeAndDateTime = async function (type, startTime, endTime) {
  return await SensorLog.findAll({
    where: {
      type: type,
      createdAt: {
        [Op.gt]: new Date(startTime.datetime),
        [Op.lt]: new Date(endTime.datetime),
      },
    },
  });
};

let createSensorLog = async function ({ type, data }) {
  return await SensorLog.create({ data: data, type: type });
};

module.exports = {
  getSensorLogs: getSensorLogs,
  createSensorLog: createSensorLog,
};

const { Op } = require("sequelize");
const { TaskLog } = require("../models/TaskLog");

let getTaskLogs = async function (args) {
  if (args.id != null) {
    return await [TaskLog.findByPk(args.id)];
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
  return await TaskLog.findAll();
};

let getByType = async function (type) {
  return await TaskLog.findAll({
    where: {
      type: type,
    },
  });
};

let getByDateTime = async function (startTime, endTime) {
  return await TaskLog.findAll({
    where: {
      createdAt: {
        [Op.gt]: new Date(startTime.datetime),
        [Op.lt]: new Date(endTime.datetime),
      },
    },
  });
};

let getByTypeAndDateTime = async function (type, startTime, endTime) {
  return await TaskLog.findAll({
    where: {
      type: type,
      createdAt: {
        [Op.gt]: new Date(startTime.datetime),
        [Op.lt]: new Date(endTime.datetime),
      },
    },
  });
};

let createTaskLog = async function ({ type, data }) {
  return await TaskLog.create({ data: data, type: type });
};

module.exports = {
  getTaskLogs: getTaskLogs,
  createTaskLog: createTaskLog,
};

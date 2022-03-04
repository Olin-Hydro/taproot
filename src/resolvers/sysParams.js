const { SysParams } = require("../models/SysParams");

let getSysParams = async function (args) {
  if (args.id != null) {
    return await [SysParams.findByPk(args.id)];
  }
  return await SysParams.findAll();
};

let createSysParams = async function (data) {
  return await SysParams.create({
    phSenseInterval: data.phSenseInterval,
    phTaskInterval: data.phTaskInterval,
    ecSenseInterval: data.ecSenseInterval,
    ecTaskInterval: data.ecTaskInterval,
    tempSenseInterval: data.tempSenseInterval,
    tempTaskInterval: data.tempTaskInterval,
    waterSenseInterval: data.waterSenseInterval,
    waterTaskInterval: data.waterTaskInterval,
  });
};

let deleteSysParams = async function (id) {
  await SysParams.findByPk(id);
  await SysParams.destroy({
    where: {
      id: id,
    },
  });
  return deletedSys;
};

let updateSysParams = async function (id, data) {
  await SysParams.update(
    {
      phSenseInterval: data.phSenseInterval,
      phTaskInterval: data.phTaskInterval,
      ecSenseInterval: data.ecSenseInterval,
      ecTaskInterval: data.ecTaskInterval,
      tempSenseInterval: data.tempSenseInterval,
      tempTaskInterval: data.tempTaskInterval,
      waterSenseInterval: data.waterSenseInterval,
      waterTaskInterval: data.waterTaskInterval,
    },
    {
      where: {
        id: id,
      },
    }
  );
  return await SysParams.findByPk(id);
};

module.exports = {
  getSysParams: getSysParams,
  createSysParams: createSysParams,
  deleteSysParams: deleteSysParams,
  updateSysParams: updateSysParams,
};

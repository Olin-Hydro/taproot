const { SysParams } = require("../models/SysParams");

let getSysParams = async function (args) {
  if (args.id != null) {
    return [await SysParams.findByPk(args.id)];
  }
  return await SysParams.findAll();
};

let createSysParams = async function (data) {
  return await SysParams.create({
    phSenseInterval: data.phSenseInterval,
    phTaskInterval: data.phTaskInterval,
    phTaskLength: data.phTaskLength,
    phMax: data.phMax,
    ecSenseInterval: data.ecSenseInterval,
    ecTaskInterval: data.ecTaskInterval,
    ecTaskLength: data.ecTaskLength,
    ecMin: data.ecMin,
    tempSenseInterval: data.tempSenseInterval,
    tempTaskInterval: data.tempTaskInterval,
    tempTaskLength: data.tempTaskLength,
    waterSenseInterval: data.waterSenseInterval,
    waterTaskInterval: data.waterTaskInterval,
    waterTaskLength: data.waterTaskLength,
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
      phTaskLength: data.phTaskLength,
      phMax: data.phMax,
      ecSenseInterval: data.ecSenseInterval,
      ecTaskInterval: data.ecTaskInterval,
      ecTaskLength: data.ecTaskLength,
      ecMin: data.ecMin,
      tempSenseInterval: data.tempSenseInterval,
      tempTaskInterval: data.tempTaskInterval,
      tempTaskLength: data.tempTaskLength,
      waterSenseInterval: data.waterSenseInterval,
      waterTaskInterval: data.waterTaskInterval,
      waterTaskLength: data.waterTaskLength,
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

'use strict';

module.exports = (sequelize, DataTypes) => {
  var DataSet = sequelize.define('DataSet', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    dataSetId: {
      type : DataTypes.STRING(20),
      unique:"compositeIndex",
    },
  });

  return DataSet;
}

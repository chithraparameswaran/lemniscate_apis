'use strict';

module.exports = (sequelize, DataTypes) => {
  var Collections = sequelize.define('Collections', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(20),
    },
    reviewId: {
      type : DataTypes.STRING(20),
      unique:"compositeIndex",
    },
  });

  return Collections;
}

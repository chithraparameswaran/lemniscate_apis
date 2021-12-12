'use strict';

module.exports = (sequelize, DataTypes) => {
  var Resource = sequelize.define('Resource', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    review_id : {
      type: DataTypes.INTEGER(),
    },
    dataSetId: {
      type : DataTypes.STRING(20),
      unique:"compositeIndex",
    },

  });
  Resource.associate = function (models) {
    models.Resource.belongsTo(models.DataSet, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'dataSetId',
        allowNull: false
        // allowNull: false -- already defined
      },
    });
  };

  return Resource;
}

const { DataTypes } = require('sequelize');
const BaseModel = require('../../../main/utils/DB/baseModel');

module.exports = (sequelize) => sequelize.define(
  'PhoneVerification',
  {
    ...BaseModel.attributes,
    phone: { type: DataTypes.STRING(255), allowNull: false },
    code: { type: DataTypes.INTEGER, allowNull: false },
    expired_at: { type: DataTypes.DATE, allowNull: false },
  },
  BaseModel.getOptions({ tableName: 'phone_verification', withSoftDelete: true }),
);

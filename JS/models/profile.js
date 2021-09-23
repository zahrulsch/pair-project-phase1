'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.Seller, {foreignKey: 'SellerId'})
    }
  };
  Profile.init({
    fullNam: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    SellerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};
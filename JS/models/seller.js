'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class Seller extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Seller.hasMany(models.Product, {foreignKey: 'SellerId'})
      Seller.hasOne(models.Profile, {foreignKey: 'SellerId'})
    }
  };
  Seller.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Username tidak boleh kosong'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password tidak boleh kosong'
        }
      }
    },
    totalProduct: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: (attr, options) => {
        let salt = bcrypt.genSaltSync(10)
        let hashedPassword = bcrypt.hashSync(attr.password, salt)
        attr.password = hashedPassword
        attr.totalProduct = 0
      }
    },
    sequelize,
    modelName: 'Seller',
  });
  return Seller;
};
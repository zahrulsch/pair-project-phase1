'use strict';
const {
  Model
} = require('sequelize');
const mailer = require('../helpers/mailSender')
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
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Nama lengkap harus diisi`
        }
      }
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Tanggal Lahir harus diisi`
        }
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Nomor Telepon harus diisi`
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Nama Kota harus diisi`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Alamat email harus diisi`,
        },
        isEmail: {
          msg: `Alamat email tidak valid`
        }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `ImageUrl harus diisi`,
        },
        isUrl: {
          msg: `ImageUrl tidak valid`
        }
      }
    },
    SellerId: DataTypes.INTEGER
  }, {
    hooks: {
      afterCreate: (instance, options) => {
        mailer(instance.fullName, instance.email)
      }
    },
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};
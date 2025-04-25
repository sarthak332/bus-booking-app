'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init({
    userId: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    tripId: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    totalSeats: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    totalPrice:  {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    status: {
      type:DataTypes.ENUM,
      defaultValue:'Inprocess',
      values:['Inprocess','Booked','Cancelled'],
    },
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      tripId: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      totalSeats: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      totalPrice: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      status: {
        type:Sequelize.ENUM,
        defaultValue:'Inprocess',
        values:['Inprocess','Booked','Cancelled'],
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
  }
};
const { Booking } = require("../models/index");

class BookingRepository {
  async create(data) {
    try {
      const response = await Booking.create(data);
      return response;
    } catch (error) {
      console.log("Something went wrong in Repository layer");
      throw error;
    }
  }

  async getAll() {
    try {
      const response = await Booking.findAll();
      return response;
    } catch (error) {
      console.log("Something went wrong in Repository layer");
      throw error;
    }
  }

  async update({ id, status }) {
    try {
      const booking = await Booking.findByPk(id);
      console.log("from the repository update it is", booking);
      booking.status = status;
      await booking.save();
      return booking;
    } catch (error) {
      console.log("Something went wrong in Repository layer");
      throw error;
    }
  }

  async get(id) {
    try {
      const booking = await Booking.findByPk(id);
      return booking;
    } catch (error) {
      console.log("Something went wrong in Repository layer");
      throw error;
    }
  }
}

module.exports = BookingRepository;

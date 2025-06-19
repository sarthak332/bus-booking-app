const BookingRepository = require("../repository/booking-repository");
const { BUSTRIP_SERVICE_PATH } = require("../config/serverConfig");
const axios = require("axios");
class BookingService {
  constructor() {
    this.bookingRepository = new BookingRepository();
  }

  async createBooking(data) {
    try {
      const tripId = data.tripId;
      const smartTripGetURL = `${BUSTRIP_SERVICE_PATH}/api/v1/bus-trip/get/${tripId}`;
      const response = (await axios.get(smartTripGetURL)).data.data;
      const seats = response.seats;
      if (seats < data.totalSeats) {
        throw new Error("Seat is not available for booking");
      }
      const price = response.price;
      const totalPrice = price * data.totalSeats;
      Object.assign(data, { totalPrice: totalPrice });
      const booking = await this.bookingRepository.create(data);
      const smartTripUpdateURL = `${BUSTRIP_SERVICE_PATH}/api/v1/bus-trip/update/${tripId}`;
      await axios.patch(smartTripUpdateURL, { seats: seats - data.totalSeats });
      const updatedBooking = await this.bookingRepository.update({
        id: booking.id,
        status: "Booked",
      });
      console.log(updatedBooking);
      return updatedBooking;
    } catch (error) {
      console.log("Something went wrong in Service layer");
      throw error;
    }
  }

  async cancelBooking(id, userId) {
    try {
      const booking = await this.bookingRepository.get(id);
      if (booking.userId !== userId) {
        const error = new Error('Unauthorized');
        error.statusCode = 401;
        throw error;
      }
      if(booking.status === 'Cancelled'){
        throw new Error('Alerady Cancelled!!');
      }
      const smartTripGetURL = `${BUSTRIP_SERVICE_PATH}/api/v1/bus-trip/get/${booking.tripId}`;
      const tripData = (await axios.get(smartTripGetURL)).data.data;
      const updateTripUrl = `${BUSTRIP_SERVICE_PATH}/api/v1/bus-trip/update/${booking.tripId}`;
      await axios.patch(updateTripUrl, {
        seats: tripData.seats + booking.totalSeats,
      });
      const cancelBookingResponse = await this.bookingRepository.update({
        id: booking.id,
        status: "Cancelled",
      });
      return cancelBookingResponse;
    } catch (error) {
      console.log("Something went wrong in Service layer");
      throw error;
    }
  }

  async getAllBooking() {
    try {
      const response = await this.bookingRepository.getAll();
      return response;
    } catch (error) {
      console.log("Something went wrong in Service layer");
      throw error;
    }
  }
}

module.exports = BookingService;

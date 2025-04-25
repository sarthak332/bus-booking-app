const BookingRepository = require('../repository/booking-repository');
const {BUSTRIP_SERVICE_PATH} = require('../config/serverConfig');
const axios = require('axios');
class BookingService{
    constructor(){
        this.bookingRepository = new BookingRepository();
    }
    
    async createBooking(data){
        try {
            const tripId = data.tripId;
            const smartTripGetURL = `${BUSTRIP_SERVICE_PATH}/api/v1/bus-trip/get/${tripId}`;
            const response = (await axios.get(smartTripGetURL)).data.data;
            const seats = response.seats;
            if(seats < data.totalSeats){
                throw new error('Seat is not avilable for booking');
            }
            const price = response.price;
            const totalPrice = price*data.totalSeats;
            Object.assign(data, {totalPrice : totalPrice});
            const smartTripUpdateURL = `${BUSTRIP_SERVICE_PATH}/api/v1/bus-trip/update/${tripId}`;
            await axios.patch(smartTripUpdateURL, {seats : seats - data.totalSeats});
            const booking = await this.bookingRepository.create(data);
            return booking;
        } catch (error) {
            console.log('Something went wrong in Service layer');
            throw error;
        }
    }
    async getAllBooking(){
        try {
            const response = await this.bookingRepository.getAll();
            return response;
        } catch (error) {
            console.log('Something went wrong in Service layer');
            throw error;
        }
    }
}

module.exports = BookingService;
const {Booking} = require('../models/index');

class BookingRepository{
    async create(data){
        try {
            const response = await Booking.create(data);
            return response;
        } catch (error) {
            console.log('Something went wrong in Repository layer');
            throw error;
        }
    }

    async getAll(){
        try {
            const response = await Booking.findAll();
            return response;
        } catch (error) {
            console.log('Something went wrong in Repository layer');
            throw error;
        }
    }
}

module.exports = BookingRepository;
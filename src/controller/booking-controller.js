const BookingService = require('../Service/booking-service');
const bookingService = new BookingService;

const create = async(req, res)=>{
    try {
        const {userId, tripId, totalSeats} = req.body;
        console.log(req.body)
        const response = await bookingService.createBooking({userId, tripId,totalSeats});
        res.status(201).json({
            data:response,
            message:'Thanku For the booking',
            success:true,
            err:{}
        });
    } catch (error) {
        res.status(500).json({
            data:{},
            message:'Something went wrong overhere',
            success:false,
            err:error
        });
    }
}

const getAll = async(req, res)=>{
    try {
        const response = await bookingService.getAllBooking();
        res.status(201).json({
            data:response,
            message:'fetched all the booking Successfully',
            success:true,
            err:{}
        });
    } catch (error) {
        res.status(500).json({
            data:{},
            message:'Something went wrong overhere',
            success:false,
            err:error
        });
    }
}

module.exports = {
    create,
    getAll,
}
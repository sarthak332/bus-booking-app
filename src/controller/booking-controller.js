const BookingService = require('../Service/booking-service');
const bookingService = new BookingService;

const create = async(req, res)=>{
    try {
        const userId = req.userId;
        const {tripId, totalSeats} = req.body;
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

const cancel = async(req, res)=>{
   try {
     const response = await bookingService.cancelBooking(req.params.id, req.userId);
     return res.status(200).json({
        data:response,
        message:'booking is cancelled Successfully..',
        success:true,
        err:{}
     });
   } catch (error) {
   return res.status(error.statusCode || 500).json({
        data:{},
        message: error.message || 'Something went wrong',
        success:false,
        err:error
    });
   }
}
module.exports = {
    create,
    getAll,
    cancel
}
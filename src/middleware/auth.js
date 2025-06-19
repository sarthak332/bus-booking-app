const axios = require('axios');
const { BUSAUTH_SERVICE_PATH } = require('../config/serverConfig');
const isAuth = async(req, res, next)=>{
    try {
        const token = req.headers['x-auth-token'];
        if(!token){
            return res.status(401).json({
                data: {},
                message: 'UNAUTHORISED USER',
                success: false,
                err: 'Need a token over here'
            });      
        }
       const BUSAUTH_URL = `${BUSAUTH_SERVICE_PATH}/api/v1/isAuthenticated`;
       const response = await axios.get(BUSAUTH_URL, {
        headers:{
           'x-auth-token': token
        }
       });
       req.userId = response.data.data.id;
       next();
    } catch (error) {
        res.status(404).json({
            message:'something went wrong',
            err:error
        });
    }
}

module.exports = {
    isAuth
}





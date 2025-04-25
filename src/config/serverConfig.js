const dotenv = require('dotenv');
dotenv.config();

module.exports={
    PORT:process.env.PORT,
    BUSTRIP_SERVICE_PATH:process.env.BUSTRIP_SERVICE_PATH
}
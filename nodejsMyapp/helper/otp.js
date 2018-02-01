
const nodemailer = require('../helper/nodeMailer');
const services = {};
services.getOtp = getOtp;
module.exports = services;

function getOtp(email_id) {
        return new Promise((resolve, reject) => {
            resolve(Math.floor(100000 + Math.random() * 900000));
	})
}
    
        


    


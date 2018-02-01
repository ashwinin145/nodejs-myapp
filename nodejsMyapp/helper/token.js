const jsonwebtoken = require('jsonwebtoken');
const config = require('../configs/configs')
const services = {};
services.getJWTtoken = getJWTtoken;

module.exports = services;

function getJWTtoken(username){
    return new Promise((resolve,reject)=>{
        resolve(jsonwebtoken.sign({username:username},config.secretJWTkey));
    })
}

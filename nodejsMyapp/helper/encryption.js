const CryptoJS = require('crypto-js');
const crypto = require('crypto');
const config = require('../configs/configs');
const services = {};
services.encryption = encryption;
services.decryption = decryption;
module.exports = services;

function encryption(password){
  return new Promise((resolve,reject)=>{
    const enc = crypto.createCipher("aes-256-ctr",config.secretkey).update(password,"utf-8","hex");
    resolve(enc);
  })
}
function decryption(password){
  return new Promise((resolve,reject)=>{
    const enc = crypto.createCipher("aes-256-ctr",config.secretkey).update(password,"utf-8","hex");
    const dec = crypto.createDecipher("aes-256-ctr",config.secretkey).update(enc,"hex","utf-8");
      resolve(dec);
  })
}

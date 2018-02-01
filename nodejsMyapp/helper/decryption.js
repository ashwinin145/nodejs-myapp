const CryptoJS = require('crypto-js');
const config = require('../configs/configs');
const ciphertext = require('../helper/encryption');
const crypto = require('crypto')
const services = {};
services.decryption = decryption;
module.exports = services;


function decryption(password){
    return new Promise((resolve,reject)=>{
        
        var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), config.secretkey);
        var password = bytes.toString(CryptoJS.enc.Utf-8);
        resolve(password);
        
    })
    
  }
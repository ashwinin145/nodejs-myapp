const mysql = require('mysql');
const config = require('../configs/configs');
var connection;
const pool = mysql.createPool({
    host     : config.mysql.host,
    user     : config.mysql.user,
    password : config.mysql.password,
    database : config.mysql.database
});
const services = {};
services.getConnection = getConnection;
module.exports = services;

function getConnection(){
    return new Promise((resolve,reject)=>{
           if(connection){
               resolve(connection)
           }else{
               pool.getConnection((err,conn)=>{
                   if(err){
                       reject(err);
                   }
                   else{
                       connection = conn;
                       resolve(connection);
                   }
               });
           }
        })
}


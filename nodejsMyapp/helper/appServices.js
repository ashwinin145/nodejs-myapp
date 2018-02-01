//const mysql = require('mysql');
const mySQlconn = require('../Model/mysqlcon');
const services = {};
services.runQuery = runQuery;
module.exports = services;

async function runQuery(query){
    return new Promise(async (resolve,reject)=>{
         const connection = await mySQlconn.getConnection();
         try{
         connection.query(query,(err,result)=>{
           (err ? reject(err) : resolve(result));
         })
     
        }catch(error){
            reject(error)
        }  
    })
}
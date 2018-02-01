const mysql = require('mysql');
const mySQlconn = require('../Model/mysqlcon');
const appServices = require('../helper/appServices');
let services = {};
services.userLogin = userLogin;
services.userId  = userId;
module.exports = services;

async function userLogin(username,password) {
    const query = mysql.format("select username,email_id,user_id from users where username = ? and password = ? ", [username,password]);
    return await appServices.runQuery(query);
}
async function userId(username){
    const query = mysql.format("select user_id from users where username = ?",[username]);
    return await appServices.runQuery(query);
}
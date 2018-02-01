const mysql = require('mysql');
const mySQlconn = require('../Model/mysqlcon');
const appServices = require('../helper/appServices');
const config = require('../configs/configs')

const services = {};
services.userSignup = userSignup;
module.exports = services;

async function userSignup(username,password,email_id){
    const query = mysql.format
    ("INSERT INTO users (username,password,email_id) VALUES(?,?,?)",[username,password,email_id]);
    return await appServices.runQuery(query);
}
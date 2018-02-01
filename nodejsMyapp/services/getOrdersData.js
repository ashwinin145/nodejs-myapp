const mysql = require('mysql');
const mySQlconn = require('../Model/mysqlcon');
const appServices = require('../helper/appServices');
const config = require('../configs/configs');

module.exports = {
  //to get data for the specific month and year
  getOrdersDatabyMonth: async function getOrdersDatabyMonth(month, year) {
    const query = mysql.format("select * from orders where MONTH(date) = ? and YEAR(date) = ?", [month, year]);
    return await appServices.runQuery(query);
  },
  // to get previous months data
  getOrdersDataforLastMonths: async function getOrdersDataforLastMonths(month) {
    const query = mysql.format("select order_id,date from orders where date BETWEEN DATE_SUB(CURDATE(),INTERVAL ? MONTH) AND CURDATE() ", [month]);
    return await appServices.runQuery(query);
  },
  // to get data for the specific date
  getOrdersDatabyDate: async function getOrdersDatabyDate(date) {
    const query = mysql.format("select * from orders where date >= ?", [date]);
    return await appServices.runQuery(query);
  },

  //to get data for the spacific year
  getOrdersDatabyYear: async function getOrdersDatabyYear(year) {
    const query = mysql.format("select order_id from orders where YEAR(date) = ?", [year]);
    return await appServices.runQuery(query);
  },
  //to get all the purchased items by order id
  getItemsData: async function getItemsData(month) {
    const query = mysql.format("select  items.items_id,items.item,orders.order_id from items INNER JOIN orders where MONTH(date) = ? and items.items_id = orders.items_id_fk", [month]);
    return await appServices.runQuery(query);
  },
  //Invoice
  getInvoice: async function getInvoice(month) {
    const query = mysql.format("select items.item,SUM(price) AS 'totalprice' from items INNER JOIN orders where MONTH(date)= ? AND items.items_id = orders.items_id_fk", [month]);
    return await appServices.runQuery(query);
  },
  //updating data
  updateData: async function updateData(price, items_id) {
    const query = mysql.format("UPDATE itemscopy SET price = ? where items_id = ?", [price, items_id]);
    return await appServices.runQuery(query);
  },

  updateRowData: async function updateRowData(price, item, items_id) {
    const query = mysql.format("UPDATE itemscopy SET price=?,item=? where items_id = ?", [price, item, items_id]);
    return await appServices.runQuery(query);
  },
  //to delete data
  deleteData: async function deleteData(items_id) {
    const query = mysql.format("delete from itemscopy where items_id = ?", [items_id]);
    return await appServices.runQuery(query);
  }
};





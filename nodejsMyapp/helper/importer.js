module.exports = {
    errorHandler : require('./errorModule'),
    usersignup: require('../services/userSignup'),
    sendmailer: require('../helper/nodeMailer'),
    errorHandler: require('../helper/errorModule'),
    decrypt: require('../helper/encryption'),
    userlogin: require('../services/userLogin'),
    encrypt: require('../helper/encryption'),
    JWTtoken: require('../helper/token'),
    userId: require('../services/userLogin'),
    randomotp: require('../helper/otp'),
    getData_byMonth: require('../services/getOrdersData'),
    getData_bydate: require('../services/getOrdersData'),
    getData_bylastMonth: require('../services/getOrdersData'),
    getData_byYear: require('../services/getOrdersData'),
    getItems_Data: require('../services/getOrdersData'),
    invoice: require('../services/getOrdersData'),
    updatedata: require('../services/getOrdersData'),
    updaterowdata: require('../services/getOrdersData'),
    deletedata: require('../services/getOrdersData')

}
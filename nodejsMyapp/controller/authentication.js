const mysql = require('mysql');
const router = require('express').Router();
const globalImporter = require('../helper/importer');
//function for Usersignup
router.post('/userSignup', userSignup);
async function userSignup(req, res) {
    try {
        const encryptedpassword = await globalImporter.encrypt.encryption(req.body.password)
            .catch((error) => { throw Error(error) });
        const userData = await globalImporter.usersignup.userSignup(req.body.username, encryptedpassword, req.body.email_id)
            .catch((error) => { throw Error(error) });
                res.status(200).json({
            userData: userData
        });
    } catch (error) {
        globalImporter.errorHandler.sendError(error, "msg", res);
    }
}
//function for userlogin

router.post('/userLogin', userLogin);
async function userLogin(req, res) {
    try {
        const encryptedpassword = await globalImporter.encrypt.encryption(req.body.password)
            .catch((error) => { throw Error(error) });
        const loginData = await globalImporter.userlogin.userLogin(req.body.username, encryptedpassword)
            .catch((error) => { throw Error(error) });
        const decryptedpassword = await globalImporter.decrypt.decryption(req.body.password)
            .catch((error) => { throw Error(error) });
        res.status(200).json({
            loginData: loginData,
            decryptedpassword: decryptedpassword
        });

    } catch (error) {
        globalImporter.errorHandler.sendError(error, "msg", res);
    }

}

//function for encryption

router.post('/encryption', encryption);
async function encryption(req, res) {
    try {
        const encryptedpassword = await globalImporter.encrypt.encryption(req.body.password)
            .catch((error) => { throw Error(error) });
        res.status(200).json({
            encryptedpassword: encryptedpassword
        });

    } catch (error) {
        globalImporter.errorHandler.sendError(error, "msg", res);
    }

}

//function for decryption
router.post('/decryption', decryption);
async function decryption(req, res) {
    try {
        const decryptedpassword = await globalImporter.decrypt.decryption(req.body.password)
            .catch((error) => { throw Error(error) });
        res.status(200).json({
            decryptedpassword: decryptedpassword
        });

    } catch (error) {
        globalImporter.errorHandler.sendError(error, "msg", res);
    }

}
// to generate token

router.post('/token', token);
async function token(req, res) {
    try {
        const userid = await globalImporter.userId.userId(req.body.username)
            .catch((error) => { throw Error(error) });
        const token = await globalImporter.JWTtoken.getJWTtoken(req.body.username)
            .catch((error) => { throw Error(error) });
        res.status(200).json({
            token: token,
            userid: userid
        })

    } catch (error) {
        globalImporter.errorHandler.sendError(error, "msg", res);
    }

}

//to generate random otp

router.post('/otp', otp);
async function otp(req, res) {
    try {
        const otp = await globalImporter.randomotp.getOtp(req.body.email_id)
            .catch((error) => { throw Error(error) });
        res.status(200).json({
            otp: otp
        });

    } catch (error) {
        globalImporter.errorHandler.sendError(error, "msg", res);
    }
}

//to get ordersdata of specific month and year

router.post('/getOrdersDatabyMonth', getOrdersDatabyMonth);
async function getOrdersDatabyMonth(req, res) {

    try {
        const getordersdata_byMonth = await globalImporter.getData_byMonth.getOrdersDatabyMonth(req.body.month, req.body.year)
            .catch((error) => { throw Error(error) });
        res.status(200).json({
            getordersdata_byMonth: getordersdata_byMonth
        });

    } catch (error) {
        globalImporter.errorHandler.sendError(error, "msg", res);
    }

}

// to get data by specific date

router.post('/getOrdersDatabyDate', getOrdersDatabyDate);
async function getOrdersDatabyDate(req, res) {
    try {
        const getordersdata_byDate = await globalImporter.getData_bydate.getOrdersDatabyDate(req.body.date)
            .catch((error) => { throw Error(error) });
        res.status(200).json({
            getordersdata_byDate: getordersdata_byDate
        });

    } catch (error) {
        globalImporter.errorHandler.sendError(error, "msg", res);
    }

}

//to get ordersdata by previous months

router.post('/getOrdersDataforLastMonths', getOrdersDataforLastMonths);
async function getOrdersDataforLastMonths(req, res) {
    try {
        const getordersdata_bylastMonths = await globalImporter.getData_bylastMonth.getOrdersDataforLastMonths(req.body.month)
            .catch((error) => { throw Error(error) });
        res.status(200).json({
            getordersdata_bylastMonths: getordersdata_bylastMonths
        });
    } catch (error) {
        globalImporter.errorHandler.sendError(error, "msg", res);
    }
}

//to get ordersdata by year

router.post('/getOrdersDatabyYear', getOrdersDatabyYear);
async function getOrdersDatabyYear(req, res) {
    try {
        const getordersdata_byYear = await globalImporter.getData_byYear.getOrdersDatabyYear(req.body.year)
            .catch((error) => { throw Error(error) });
        res.status(200).json({
            getordersdata_byYear: getordersdata_byYear
        });

    } catch (error) {
        globalImporter.errorHandler.sendError(error, "msg", res);
    }

}

//to get all the items from items table for the specific month

router.post('/getItemsData', getItemsData);
async function getItemsData(req, res) {
    try {
        const getItems_DatabyMonth = await globalImporter.getItems_Data.getItemsData(req.body.month)
            .catch((error) => { throw Error(error) });
        res.status(200).json({
            getItems_DatabyMonth: getItems_DatabyMonth
        });

    } catch (error) {
        globalImporter.errorHandler.sendError(error, "msg", res);
    }

}

//to get Invoice

router.post('/getInvoice', getInvoice);
async function getInvoice(req, res) {
    try {
        const Invoice = await globalImporter.invoice.getInvoice(req.body.month)
            .catch((error) => { throw Error(error) });
        res.status(200).json({
            Invoice: Invoice
        });

    } catch (error) {
        globalImporter.errorHandler.sendError(error, "msg", res);
    }

}

//to update data
router.post('/updateData', updateData);
async function updateData(req, res) {
    try {
        const updatedData = await globalImporter.updatedata.updateData(req.body.price, req.body.items_id)
            .catch((error) => { throw Error(error) });
        res.status(200).json({
            updatedData: updatedData
        });

    } catch (error) {
        globalImporter.errorHandler.sendError(error, "msg", res);
    }

}

router.post('/updateRowData', updateRowData);
async function updateRowData(req, res) {
    try {
        const updatedRowData = await globalImporter.updaterowdata.updateRowData(req.body.price, req.body.item, req.body.items_id)
            .catch((error) => { throw Error(error) });
        res.status(200).json({
            updatedRowData: updatedRowData
        });

    } catch (error) {
        globalImporter.errorHandler.sendError(error, "msg", res);
    }

}
// to delete row data from table
router.post('/deleteData', deleteData);
async function deleteData(req, res) {
    try {
        const deleted_data = await globalImporter.deletedata.deleteData(req.body.items_id)
            .catch((error) => { throw Error(error) });
        res.status(200).json({
            deleted_data: deleted_data
        });

    } catch (error) {
        globalImporter.errorHandler.sendError(error, "msg", res);
    }

}


module.exports = router;
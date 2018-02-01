

module.exports = {
    sendError : function(error,message,res){
        res.status(200).json({status : false,message : message})
        console.log(error.stack);
    }
};

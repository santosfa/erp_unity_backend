
module.exports.resp = function(obj = null, msg = "", code){ 
    return {
            "status":code,
            "message":msg,
            "body":obj,
        };
};
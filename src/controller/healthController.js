
class healthController {
    status(req, res){
        return res.status(200).json(
            {"message":"Service on line."}
        );
    };
};
module.exports = new healthController();
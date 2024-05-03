
class healthController {
    status(req, res){
        return res.status(200).json(
            {"message":"Servico esta fucionando."}
        );
    };
};
module.exports = new healthController();
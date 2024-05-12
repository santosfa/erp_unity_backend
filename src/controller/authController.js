
//******************************
//authController.js
//******************************

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const User = require('../model/user/userModel');
const authConfig = require('../config/auth.json');
const msg = require('../utils/message');

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: authConfig.time,
    });
};

class authController {
    async authenticate(req, res){
        const { companyCode, email, password} = req.body;
        try{
            const user = await User.findOne({ email, companyCode }).select('+password');
            if (!user){
                return res.status(400).json(
                    msg.resp(null, "Invalid user credentials. Please check your information and try again.", 400)
                );
            }else{
                if (!await bcrypt.compare(password, user.password)){
                    return res.status(400).json(
                        msg.resp(null, "Invalid user credentials. Please check your information and try again.", 400)
                    );
                }else{
                    user.password = undefined;
                    const newUser = {
                        user,
                        token: generateToken({ id: user.id }),
                    };
                    return res.status(200).json(
                        msg.resp(newUser, "User authenticated successfully.", 200)
                    );
                };
            }
        }
        catch (err){
            return res.status(500).json(
                msg.resp(null, "Authentication error. Please contact the system administrator for assistance.", 500)
            );
        }
    };

    async validateToken(req, res) {
        const { token } = req.body;

        if (!token) {
            return res.status(401).json({ message: "No token provided." });
        }
    
        jwt.verify(token, authConfig.secret, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid token." });
            }
    
            // O token é válido
            const responseBody = {
                message: "Token is valid.",
                payload: decoded, // Adicione os dados decodificados ao corpo da resposta
                token: token // Se desejar, pode incluir o token no corpo da resposta também
            };
    
            return res.status(200).json(responseBody);
        });
    }
}

module.exports = authController;
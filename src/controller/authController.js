
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
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json(
                msg.resp(null, "No token provided.", 401)
            );
        }

        const parts = authHeader.split(' ');

        if (parts.length !== 2 || !/^Bearer$/i.test(parts[0])) {
            return res.status(401).json(
                msg.resp(null, "Token error.", 401)
            );
        }

        const token = parts[1];

        jwt.verify(token, authConfig.secret, (err, decoded) => {
            if (err) {
                return res.status(401).json(
                    msg.resp(null, "Invalid token.", 401)
                );
            }

            // O token é válido
            req.userId = decoded.id; // Adicione o ID do usuário decodificado ao objeto de requisição para uso posterior
            return res.status(200).json(
                msg.resp(decoded, "Token is valid.", 200)
            );
        });
    }
}

module.exports = authController;
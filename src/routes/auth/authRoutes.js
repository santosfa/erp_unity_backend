//******************************
//authRoutes.js
//******************************

const express           = require('express');
const authController    = require('../../controller/authController');

const auth = new authController();
const router            = express.Router(); 

router.post('/authenticate', async (req, res) => {
    await auth.authenticate(req, res);
});

router.post('/validate-token', async (req, res) => {
    await auth.validateToken(req, res);
});

module.exports = router;




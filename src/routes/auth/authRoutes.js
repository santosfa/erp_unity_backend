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

module.exports = router;




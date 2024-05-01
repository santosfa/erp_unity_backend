//******************************
//cutomerRoutes.js
//******************************

const express = require('express');
const BaseController = require('../../controller/baseController');
const userMiddleware = require('../../middleware/authMiddleware'); 
const router = express.Router();
const baseController = new BaseController();

router.use(userMiddleware);

router.get('/all', async (req, res) => {
    await baseController.listAll(req, res, 'customer');
});

router.get('/search/:field/:value', async (req, res) => {
    const { field, value } = req.params;
    await baseController.listByField(req, res, 'customer', field, value);
});

router.post('/create', async (req, res) => {
    await baseController.create(req, res, 'customer');
});

module.exports = router;


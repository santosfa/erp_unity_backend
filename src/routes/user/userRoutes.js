const express           = require('express');
const BaseController    = require('../../controller/baseController');

const router = express.Router();
const baseController = new BaseController();



//list All Locations
router.get('/all', async (req, res) => {
    await baseController.listAll(req, res, 'user');
});
//get location By id
router.get('/search/:field/:value', async (req, res) => {
    const { field, value } = req.params;
    await baseController.listByField(req, res, 'user', field, value);
});
//create new location
router.post('/create', async (req, res) => {
    await baseController.create(req, res, 'user');
});

module.exports = router;
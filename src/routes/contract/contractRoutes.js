const express           = require('express');
const BaseController    = require('../../controller/baseController');

const router = express.Router();
const baseController = new BaseController();


//list All Customers
router.get('/all', async (req, res) => {
    await baseController.listAll(req, res, 'contract');
});

//get document By id
router.get('/search/:field/:value', async (req, res) => {
    const { field, value } = req.params;
    await baseController.listByField(req, res, 'contract', field, value);
});


module.exports = router;
//create newContract
router.post('/create', async (req, res) => {
    await baseController.create(req, res, 'contract');
});

module.exports = router;
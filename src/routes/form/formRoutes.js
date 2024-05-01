const express           = require('express');
const BaseController    = require('../../controller/baseController');

const router = express.Router();
const baseController = new BaseController();


//list All Customers
router.get('/all', async (req, res) => {
    await baseController.listAll(req, res, 'form');
});

//get document By id
router.get('/search/:field/:value', async (req, res) => {
    console.log("Consultando model de formulario...")
    const { field, value } = req.params;
    await baseController.listByField(req, res, 'form', field, value);
});


module.exports = router;
//create newForm
router.post('/create', async (req, res) => {
    await baseController.create(req, res, 'form');
});

module.exports = router;
const express           = require('express');
const healthController  = require('../controller/healthController');
const router            = express.Router(); 
router.get('/',healthController.status);
module.exports = router;

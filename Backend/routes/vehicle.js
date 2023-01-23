const express = require('express');
const bodyparser = require('body-parser')
const router = express.Router()

const {addvehicle}=require('../controllers/addvehicle')
router.post('/addvehicle',addvehicle)



module.exports = router;

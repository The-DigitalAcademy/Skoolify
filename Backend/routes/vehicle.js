const express = require('express');
const bodyparser = require('body-parser')
const router = express.Router()

const addvehicle = require('../controllers/addvehicle');
const{viewvehicle} = require('../controllers/addvehicle');
const{getvehicle} = require('../controllers/addvehicle');

router.post('/addvehicle',addvehicle.addvehicle)
router.patch('/removevehicle/:vehicle_id',addvehicle.removeVehicle)
router.get('/viewvehicle/:id',viewvehicle)
router.get('/getvehicle/:id',addvehicle.getvehicle)

module.exports = router;

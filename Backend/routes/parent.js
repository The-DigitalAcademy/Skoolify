const express = require('express');
const bodyparser = require('body-parser')
const router = express.Router()

//routes here.
const {getSchool}= require('../controllers/parent');
const {getOneSchool}= require('../controllers/parent')
const {getVehicleUser}= require('../controllers/parent')
const {getVehicle}=require('../controllers/parent')
const {getSchoolVehicle}=require('../controllers/parent')

router.get('/getSchool',getSchool)
router.get('/getOneSchool/:id',getOneSchool)
router.get('/getVehicle/:id',getVehicle)
router.get('/getVehicleUser/:id',getVehicleUser)
router.get('/getSchoolVehicle/:id',getSchoolVehicle)


//this goes at the bottom
module.exports = router;
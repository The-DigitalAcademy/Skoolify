const express = require('express');
const bodyparser = require('body-parser')
const router = express.Router()

//routes here.
const {getSchool}= require('../controllers/parent');
const {getOneSchool}= require('../controllers/parent')
const {getVehicle}=require('../controllers/parent')
const {getSchoolVehicle}= require('../controllers/parent')
const {viewOwner}= require('../controllers/parent')
const {ViewVehicle}= require('../controllers/parent')
const {viewSchool} = require('../controllers/parent')
const {schoolTransporters} = require('../controllers/parent')
const{addRequests} = require('../controllers/parent')
const{getRequests} = require('../controllers/parent')

router.get('/getSchool',getSchool)
router.get('/getOneSchool/:id',getOneSchool)
router.get('/getVehicle/:id',getVehicle)
router.get('/getSchoolVehicle/:id',getSchoolVehicle)
router.get('/getOneOwner/:user_id',viewOwner)
router.get('/getOneVehicle/:id',ViewVehicle)
router.post('/addRequests',addRequests)
router.get('/getRequests',getRequests)
//router.get('/viewSchool/:id',viewSchool)
//router.get('schoolTransporters/:id',schoolTransporters)


//this goes at the bottom
module.exports = router;
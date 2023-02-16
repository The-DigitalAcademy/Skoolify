const express = require('express');

const router = express.Router()

//routes here.


const {register} = require("../controllers/register");

const {login} = require("../controllers/login");

const {forgotpassword} = require("../controllers/forgotpassword");

router.post('/register' , register); //POST request to register the user

router.post('/login' , login); // POST request to login the user

router.get('/getSchoolVehicle/:id',getSchoolVehicle)

const {getSchoolVehicle}= require('../controllers/parent')

router.post('/forgotpassword',forgotpassword);


router.post('/price',price )

const { price } = require('../controllers/owner');
//this goes at the bottom
module.exports = router;
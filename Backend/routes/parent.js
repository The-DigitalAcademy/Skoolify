const express = require('express');
const bodyparser = require('body-parser')
const router = express.Router()

//routes here.
const {getSchool}= require('../controllers/parent');


router.get('/getSchool',getSchool)



//this goes at the bottom
module.exports = router;
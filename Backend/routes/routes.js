const express = require('express');

const router = express.Router()

//routes here.


const {register} = require("../controllers/register");

const {login} = require("../controllers/login");

const {forgotpassword} = require("../controllers/forgotpassword");

router.post('/register' , register); //POST request to register the user

router.post('/login' , login); // POST request to login the user

router.post('/forgotpassword',forgotpassword);

//this goes at the bottom
module.exports = router;
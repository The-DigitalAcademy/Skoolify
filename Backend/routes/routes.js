const express = require('express');

const router = express.Router()

//routes here.


const {register} = require("../controllers/register");

const {login} = require("../controllers/login");

router.post('/register' , register); //POST request to register the user

router.post('/login' , login); // POST request to login the user



//this goes at the bottom
module.exports = router;
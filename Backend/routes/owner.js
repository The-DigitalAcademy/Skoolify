const express = require("express");
const owner = require("../controllers/owner");

const router = express.Router();


const {getSchool}= require('../controllers/owner');
router.get('/getSchool/:id',getSchool);




const {price}= require('../controllers/owner');
router.post('/price',price);



const {viewOwnerRequests}= require('../controllers/owner');
router.get('/viewOwnerRequests/:id',viewOwnerRequests);

module.exports = router;



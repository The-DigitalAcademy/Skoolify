const express = require("express");
const owner = require("../controllers/owner");

const router = express.Router();
const {getSchool}= require('../controllers/owner');
router.get('/getSchool/:id',getSchool);
const {price }= require('../controllers/owner');
router.post('/price',price);
router.get('/requests/:owner_id/:request_id',owner.viewRequest);
router.get('/requests/:owner_id',owner.viewRequests);
router.patch('/requests/decline/:request_id',owner.decline);
router.patch('/requests/accept/:request_id',owner.accept);



module.exports = router;


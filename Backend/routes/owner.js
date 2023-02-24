const express = require("express");
const owner = require("../controllers/owner");

const router = express.Router();
const {getSchool}= require('../controllers/owner');
router.get('/getSchool/:id',getSchool);
const {price }= require('../controllers/owner');
router.post('/price',price);
router.get('/requests/:owner_id/:request_id',owner.viewRequest);
router.get('/requests/:owner_id',owner.viewRequests);
router.get('/myrequests/:owner_id',owner.viewMyRequests);
router.get('/oneApplication/:application_id',owner.getOneApplication);
router.patch('/requests/decline/:request_id',owner.decline);
router.patch('/requests/accept/:request_id',owner.accept);






const {viewOwnerRequests}= require('../controllers/owner');
router.get('/viewOwnerRequests/:id',viewOwnerRequests);

module.exports = router;


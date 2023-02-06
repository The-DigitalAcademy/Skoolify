const express = require("express");
const owner = require("../controllers/owner");

const router = express.Router();

router.get('/requests/:owner_id/:request_id',owner.viewRequest);
router.get('/requests/:owner_id',owner.viewRequests);


module.exports = router;
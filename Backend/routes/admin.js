const express = require("express");
const admin = require("../controllers/admin");

const router = express.Router();

//routes here.
//School management routes
router.get('/viewSchools', admin.viewSchools)
router.post("/addSchool", admin.addSchool);
router.patch("/removeSchool/:school_id", admin.removeSchool);
//Owner management routes
router.get("/owners", admin.viewAllOwners);
router.get("/owners/:user_id", admin.viewOwner);
router.get("/owners/vehicles/:user_id", admin.ownerVehicles);
router.get("/owners/vehicle/:vehicle_id", admin.ViewVehicle);
router.patch("/owners/suspend/:user_id", admin.suspendOwner);
//this goes at the bottom
module.exports = router;

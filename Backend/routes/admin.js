const express = require("express");
const admin = require("../controllers/admin");

const router = express.Router();

//routes here.
//School management routes
router.get('/viewSchools', admin.viewSchools)
router.get('/viewSchools/:school_id', admin.viewSchool)
router.post("/addSchool", admin.addSchool);
router.patch("/removeSchool/:school_id", admin.removeSchool);
router.get("/schoolTransporters/:school_id", admin.viewSchoolTransporters);



//Owner management routes
router.get("/owners", admin.viewAllOwners);
router.get("/owners/top-rated", admin.viewTopRated);
router.get("/viewVerified", admin.verifiedOwners);
router.get("/owners/:user_id", admin.viewOwner);
router.get("/owners/vehicles/:user_id", admin.ownerVehicles);
router.get("/owners/vehicle/:vehicle_id", admin.ViewVehicle);
router.patch("/owners/suspend/:user_id", admin.suspendOwner);

//Applications
router.get('/applications',admin.viewAllApplications)
router.get('/applications/:application_id',admin.viewApplication)
router.patch('/applications/:owner_id/:school_id/:vehicle_id/:application_id',admin.approve)
router.patch('/applications/decline/:application_id',admin.declineApplication)




//this goes at the bottom
module.exports = router;

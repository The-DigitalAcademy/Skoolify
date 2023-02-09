const express = require("express");
const account = require("../controllers/account");

const router = express.Router();

router.get('/:user_id',account.getUser);
router.patch('/details/:user_id',account.updateDetails);
router.patch('/details/image/:user_id',account.updateImage);
router.patch('/password/:user_id',account.updatePassword);

module.exports = router;




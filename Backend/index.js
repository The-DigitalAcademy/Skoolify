const express = require("express");
var cors = require("cors");
require("dotenv").config();
const app = express();

//impot classes
const admin = require("./routes/admin");
const parent = require("./routes/parent");
const account = require("./routes/account");

const {register} = require("./controllers/register");
const {login} = require("./controllers/login");

<<<<<<< HEAD
//impot classes
const vehicle = require("./routes/vehicle");
=======
>>>>>>> 9e6ac88ce922b862a8becd57120c48247c98907a


var corsOptions = {
  origin: "*",
  
};

app.use(express.json());
app.use(cors(corsOptions));

app.listen(8080, () => {
  console.log("Server running on port 8080");
});

app.use("/admin", admin);
app.use('/account',account)
app.use('/parent',parent)
app.use("/register", register);
app.use("/login", login);

<<<<<<< HEAD
app.use('/vehicle', vehicle)
=======
>>>>>>> 9e6ac88ce922b862a8becd57120c48247c98907a



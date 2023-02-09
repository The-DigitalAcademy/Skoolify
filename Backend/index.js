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
const {forgotpassword} = require("./controllers/forgotpassword");


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
app.use("/forgotpassword", forgotpassword);




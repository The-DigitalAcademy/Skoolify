const express = require('express');
var cors = require('cors');
require("dotenv").config();
const db = require("./config/db_config");
const app = express();



//impot classes
//const routes = require("./routes/routes");
const parent=require("./routes/parent")

var corsOptions = {
    origin: "*"
  };

 

 
app.use(express.json());
app.use(cors(corsOptions));

app.listen(8080,() => {console.log('Server running on port 8080');});

//app.use('/', routes)
app.use('/parent',parent)



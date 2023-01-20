const pg = require('pg')
var client = new pg.Client('postgres://wjakvoxn:maJBFP6m0qat-bWHqkZ7-TDbuIbhZeno@snuffleupagus.db.elephantsql.com/wjakvoxn');;
client.connect(function(err){
  if (err) {
    console.log("Database connection error");
  }else
  {
    console.log("Database connected successfully");
  }
})

module.exports = client;
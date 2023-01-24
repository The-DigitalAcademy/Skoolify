const  bcrypt  =  require("bcrypt");

const  client  =  require("../config/db_config");

const  jwt  =  require("jsonwebtoken");


//Registration Function

exports.register  =  async (req, res) => {
const { name, email, surname, password,gender,image,account,ratings,votes,is_suspened } =  req.body;
try {
const  data  =  await client.query(`SELECT * FROM Users WHERE email= $1;`, [email]); //Checking if user already exists
const  arr  =  data.rows;
if (arr.length  !=  0) {
return  res.status(400).json({
error: "Email already there, No need to register again.",
});
}
else {
bcrypt.hash(password, 10, (err, hash) => {
if (err)
res.status(err).json({
error: "Server error",
});
const  user  = {
name,
surname,

email,

password: hash,
gender,
image,
account,

ratings,
votes,
is_suspened
};
var  flag  =  1; //Declaring a flag

//Inserting data into the database

client
.query(`INSERT INTO Users ( name,surname,email, password,gender,image,account,ratings,votes,is_suspended) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);`, [user.name, user.surname,user.email, user.password,user.gender,user.image,user.account,user.ratings,user.votes,user.is_suspened], (err) => {

if (err) {
flag  =  0; //If user is not inserted is not inserted to database assigning flag as 0/false.
console.error(err);
return  res.status(500).json({
error: "Database error"
})
}
else {
flag  =  1;
res.status(200).send({ message: 'User added to database' });
}
})
if (flag) {
const  token  = jwt.sign( //Signing a jwt token
{
email: user.email
},
process.env.SECRET_KEY
);
};
});
}
}
catch (err) {
console.log(err);
res.status(500).json({
error: "Database error while registring user!", //Database connection error
});
};
}
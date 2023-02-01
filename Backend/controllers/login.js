const bcrypt = require("bcrypt");

const client = require("../config/db_config");

const jwt = require("jsonwebtoken");

//Login Function
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log(email);
    const data = await client.query("SELECT * FROM Users WHERE email= $1", [
      email,
    ]); //Verifying if the user exists in the database
    const user = data.rows;
    if (user.length === 0) {
      res.status(400).json({
        message: "User is not registered, Sign Up first",
      });
    } else {
      bcrypt.compare(password, user[0].password, (err, result) => {
        //Comparing the hashed password
        if (err) {
          res.status(500).json({
            message: "Encryption failed",
          });
        } else if (result === true) {
          //Checking if credentials match
          const token = jwt.sign(
            {
              email: email,
              password: password,
              user_id: user[0].user_id,
              name: user[0].name,
              surname: user[0].surname,
              account: user[0].account,
              image: user[0].image,
              ratings: user[0].ratings,
            },
            "ojiehfiuehfowijfwpifjwpifjhwifghwpfihwpgwhgpi",{
                expiresIn:'24h',
                algorithm:'HS256'
            }
          );
          res.status(200).json({
            message: "Welcome back! "+user[0].name,
            token: token
          });
        } else {
          //Declaring the errors
          if (result != true)
            res.status(400).json({
              message: "Incorect login credentials",
            });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Database error occurred while signing in!", //Database connection error
    });
  }
};

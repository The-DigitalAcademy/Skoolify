const client=require('../config/db_config')

//get schools query


exports.getSchool= async (req, res) => {
    try {
          //get all schools form the database
          const data = await client.query(
            `SELECT * FROM school`,
            
            (err,result) => {
              if (err) {
             //If no school inserted to database
                console.error(err);
                return res.status(500).json({
                  error: "Database error",
                });
              } else {
                res
                  .status(200)
                  .send(result.rows);
              }
            }
          );
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: "Database error", //Database connection error
      });
    }
  };
const client=require('../config/db_config')

//get schools query

exports.getSchool= async (req, res) => {
    try {
          //get all schools form the database
          const data = await client.query(
            `SELECT * FROM school WHERE is_deleted = false`,
            
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

  //getSchool by id

exports.getOneSchool = async (req, res) => {
    const school_id = parseInt(req.params.id);
    try {
         
          const data = await client.query(
            `SELECT * FROM school where school_id = $1`,
            [school_id],
            (err,result) => {
              if (err) {
            
                console.error(err);
                return res.status(500).json({
                  error: "Database error",
                });
              } else {
                res
                  .status(200)
                  .send(result.rows[0]);
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

  
exports.getVehicle = async (req, res) => {
    const owner_id = parseInt(req.params.id);
    try {
          //get all post form the database
          const data = await client.query(
            `SELECT * FROM vehicle where owner_id = $1`,
            [owner_id],
            (err,result) => {
              if (err) {
             //If post are not available is not inserted to database
                console.error(err);
                return res.status(500).json({
                  error: "Database error",
                });
              } else {
                res
                  .status(200)
                  .send(result.rows[0]);
              }
            }
          );
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: "Database error while creating post!", //Database connection error
      });
    }
  };

  //get one vehicle
exports.ViewVehicle = (req, res) => {
  const vehicle_id = req.params.vehicle_id;
  const sql = "SELECT * FROM vehicle WHERE vehicle_id = $1";

  client.query(sql, [vehicle_id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: "Error fetching vehicle" });
    } else {
      res.status(200).json(results.rows[0]);
    }
  });
};

//get one owner
//
exports.viewOwner = (req, res) => {
  const user_id = req.params.user_id;
  const sql = "SELECT * FROM users WHERE user_id = $1";

  client.query(sql, [user_id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: "Error fetching owner" });
    } else {
      res.status(200).json(results.rows[0]);
    }
  });
};
//view school by id
exports.viewSchool = (req, res) => {
  const school_id = req.params.school_id;
  const sql = "SELECT * FROM school WHERE school_id = $1";

  client.query(sql, [school_id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: "Error fetching school" });
    } else {
      res.status(200).json(results.rows[0]);
    }
  });
};
//view transport
// exports.schoolTransporters = (req, res) => {
//   const school_id = req.params.school_id;
//   const sql = "SELECT * FROM vehicle_owner WHERE school_id = $1";

//   client.query(sql, [school_id], (err, results) => {
//     if (err) {
//       console.log(err);
//       res.status(400).json({ message: "Error fetching school" });
//     } else {
//       res.status(200).json(results.rows);
//     }
//   });
// };

//get vehicle from school
exports.getSchoolVehicle = async (req, res) => {
  const school_id = parseInt(req.params.id);
  try {
        //get all post form the database
        const data = await client.query(
          `SELECT * FROM vehicle_owner where school_id = $1`,
          [school_id],
          (err,result) => {
            if (err) {
           //If post are not available is not inserted to database
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
      error: "Database error while creating post!", //Database connection error
    });
  }
};

  
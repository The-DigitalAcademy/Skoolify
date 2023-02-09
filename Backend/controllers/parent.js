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

//add requests

// exports.addRequests = async (req, res) => {
//   const {parent_id,owner_id,school_id,message,pickUp_address,num_kids,desc,status} = req.body;
//   try {
        
//         const data = await client.query(
//           `INSERT INTO requests (parent_id,owner_id,school_id,message,pickUp_address,num_kids,desc,status);`,
//           [parent_id,owner_id,school_id,message,pickUp_address,num_kids,desc,status],
//           (err) => {
//             if (err) {
           
//               console.error(err);
//               return res.status(500).json({
//                 error: "Database error",
//               });
//             } else {
//               res
//                 .status(200)
//                 .send({ message: `Post for user ${parent_id} have been added to the database`});
//             }
//           }
//         );
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       error: "Database error while creating post!", 
//     });
//   }
// };

//get requests
exports.getRequests = async (req, res) => {
  try {
        //get all post form the database
        const data = await client.query(
          `SELECT * FROM requests`,
          
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

//parent requests
exports.addRequests = (req, res) => {
  //const {parent_id,owner_id,school_id} = parseInt(req.params.id);

  const {parent_id,owner_id,school_id,message,address,num_kids,description} = req.body;
  const sql =
    "INSERT INTO requests (parent_id,owner_id,school_id,message,address,num_kids,description,status) values($1,$2,$3,$4,$5,$6,$7,$8)";

    console.log(address)
  client.query(sql, [parent_id,owner_id,school_id,message,address,num_kids,description,"PENDING"], (err, results) => {
    if (err) {
      console.log(err)
      
      res.status(401).json({ message: "Error inserting request" });
    } else {
      res.status(201).json({ message: "Request successfully added" });
    }
  });
};


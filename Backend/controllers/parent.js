const client = require("../config/db_config");

//requests
exports.viewMyRequests = (req, res) => {
  const parent_id = req.params.parent_id;
  const sql =
    "SELECT * FROM requests WHERE parent_id = $1 AND (status = 'PENDING' OR status = 'ACCEPTED')";
  client.query(sql, [parent_id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: "Error fetching requests" });
    } else {
      res.status(200).json(results.rows);
    }
  });
};

exports.viewRequest = (req, res) => {
  const request_id = req.params.request_id;
  const parent_id = req.params.parent_id;

  const request = "SELECT * FROM requests WHERE request_id = $1 AND parent_id = $2";
  const school = "SELECT * FROM school WHERE school_id = $1";
  const owner = "SELECT * FROM users WHERE user_id = $1";
  const vehicle_id = "SELECT * FROM vehicle_owner WHERE school_id = $1 AND owner_id = $2";

  client.query(request, [request_id, parent_id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: "Error fetching request" });
    } else {
      client.query(owner, [results.rows[0].owner_id], (err, ownerRes) => {
        if (err) {
          res.status(400).json({ message: "Error fetching owner" });
        } else {
          client.query(
            school,
            [results.rows[0].school_id],
            (err, schoolRes) => {
              if (err) {
                res.status(400).json({ message: "Error fetching school" });
              } else {
                client.query(
                  vehicle_id,
                  [results.rows[0].school_id,results.rows[0].owner_id],
                  (err, vehicleId) => {
                    if (err) {
                      res.status(400).json({ message: "Error fetching vehicle id" });
                    } else {
                      client.query(
                        "SELECT * FROM vehicle WHERE vehicle_id = $1",
                        [vehicleId.rows[0].vehicle_id],
                        (err, vehicleRes) => {
                          if (err) {
                            res.status(400).json({ message: "Error fetching vehicle" });
                          } else {
                            res.status(200).json({
                              request: results.rows[0],
                              owner: ownerRes.rows[0],
                              school: schoolRes.rows[0],
                              vehicle : vehicleRes.rows[0]
                            });
                            
                          }
                        }
                      )
                      
                    }
                  }
                )
              }
            }
          ); //school call
        }
      }); //parent call
    }
  }); //request call
};

//get schools query


exports.getSchool = async (req, res) => {
  try {
    //get all schools form the database
    const data = await client.query(
      `SELECT * FROM school WHERE is_deleted = false`,

      (err, result) => {
        if (err) {
          //If no school inserted to database
          console.error(err);
          return res.status(500).json({
            error: "Database error",
          });
        } else {
          res.status(200).send(result.rows);
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
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({
            error: "Database error",
          });
        } else {
          res.status(200).send(result.rows[0]);
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
      `SELECT * FROM vehicle_owner o , vehicle v  ,users u WHERE u.user_id = o.owner_id  and o.vehicle_id = v.vehicle_id and school_id = $1`,
      [owner_id],
      (err, result) => {
        if (err) {
          //If post are not available is not inserted to database
          console.error(err);
          return res.status(500).json({
            error: "Database error",
          });
        } else {
          res.status(200).send(result.rows);
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

exports.getVehicleUser = async (req, res) => {
  const user_id = req.params.id
  console.log(user_id)
  try {
    //get all post form the database
    const data = await client.query(
      `SELECT * FROM vehicle where owner_id = $1 AND is_deleted = false`,
      [user_id],
      (err, result) => {
        if (err) {
          //If post are not available is not inserted to database
          console.error(err);
          return res.status(500).json({
            error: "Database error",
          });
        } else {
          res.status(200).json(result.rows);
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


exports.priceOfTransport = async (req, res) => {
  const { owner_id, school_id } = req.body;
  try {
    //get all post form the database
    const data = await client.query(
      `SELECT * from application where school_id = $1 and owner_id = $2`,
      [school_id, owner_id],
      (err, result) => {
        if (err) {
          //If post are not available is not inserted to database
          console.error(err);
          return res.status(500).json({
            error: "Database error",
          });
        } else {
          res.status(200).json(result.rows);
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

exports.getSchoolVehicle = async (req, res) => {
  const school_id = parseInt(req.params.id);
  try {
    //get all post form the database
    const data = await client.query(
      `SELECT * FROM vehicle_owner where school_id = $1`,
      [school_id],
      (err, result) => {
        if (err) {
          //If post are not available is not inserted to database

          console.error(err);
          return res.status(500).json({
            error: "Database error",
          });
        } else {
          res.status(200).send(result.rows);
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
      (err, result) => {
        if (err) {
          //If post are not available is not inserted to database
          console.error(err);
          return res.status(500).json({
            error: "Database error",
          });
        } else {
          res.status(200).send(result.rows);
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


//rating transport owner
exports.rateOwner = async (req, res) => {
  const owner_id = req.params.owner_id;
  const rating = Number(req.body.rating)

  const votes = "SELECT * FROM users WHERE user_id = $1"
  const sql = "UPDATE users SET ratings = $1, votes = $2 WHERE user_id = $3"

  client.query(votes,[owner_id],(err,votesRes)=>{
    if (err) {
      res.status(400).json({message:'Error fetching votes'})
    }else{
      //rating calculation on average
      let counter = votesRes.rows[0].votes;
      let currentRate = votesRes.rows[0].ratings;
      let newRate = ((currentRate * counter) + rating)/(counter+1);
      newRate = Math.round( newRate * 10 ) / 10;

      //update rating in the database
      client.query(sql,[newRate,(counter+1),owner_id],(err,votesRes)=>{
        if(err) {
          res.status(402).json({message:'Error rating owner'})
        }else{
          console.log(newRate)
          res.status(200).json({message:'Owner rated'})
        }
      })
    }

  })





}

//get requests
exports.getRequests = async (req, res) => {
  try {
    //get all post form the database
    const data = await client.query(
      `SELECT * FROM requests`,

      (err, result) => {
        if (err) {
          //If post are not available is not inserted to database
          console.error(err);
          return res.status(500).json({
            error: "Database error",
          });
        } else {
          res.status(200).send(result.rows);
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

  const {
    parent_id,
    owner_id,
    school_id,
    message,
    address,
    num_kids,
    description,
  } = req.body;
  const sql =
    "INSERT INTO requests (parent_id,owner_id,school_id,message,address,num_kids,description,status) values($1,$2,$3,$4,$5,$6,$7,$8)";

  console.log(address);
  client.query(
    sql,
    [
      parent_id,
      owner_id,
      school_id,
      message,
      address,
      num_kids,
      description,
      "PENDING",
    ],
    (err, results) => {
      if (err) {
        console.log(err);

        res.status(401).json({ message: "Error inserting request" });
      } else {
        res.status(201).json({ message: "Request successfully added" });
      }
    }
  );
};

//get price from application
// exports.getAppPrice = (req, res) => {
//   const application_id = req.params.application_id;
//   const sql = "SELECT * FROM application WHERE application_id  = $1";

//   client.query(sql, [application_id], (err, results) => {
//     if (err) {
//       console.log(err);
//       res.status(400).json({ message: "Error fetching application" });
//     } else {
//       res.status(200).json(results.rows[0]);
//     }
//   });
// };

exports.getAppPrice = async (req, res) => {
  const vehicle_id = parseInt(req.params.id);
  try {
    //get all post form the database
    const data = await client.query(
      `SELECT * FROM vehicle_owner o, vehicle v , application a, users u where o.vehicle_id = v.vehicle_id and a.school_id = $1 and a.vehicle_id = v.vehicle_id and u.user_id = o.owner_id`,

      [vehicle_id],
      (err, result) => {
        if (err) {
          //If post are not available is not inserted to database
          console.error(err);
          return res.status(500).json({
            error: "Database error",
          });
        } else {
          res.status(200).send(result.rows);
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
exports.ViewoneVehicle = (req, res) => {
  const vehicle_id = req.params.vehicle_id;


  console.log(vehicle_id)

  const  vehicle = "SELECT * FROM vehicle WHERE vehicle_id = $1 " ;
  console.log(vehicle_id)
  const owner = "SELECT * FROM users WHERE user_id = $1";

  client.query( vehicle,[vehicle_id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: "Error fetching request" });
    } 
    else {
      client.query(owner, [results.rows[0].owner_id], (err, ownerRes) => {
        if (err) {
          res.status(400).json({ message: "Error fetching vehivle" });
        } 
        else {
          client.query('SELECT * FROM vehicle_owner WHERE vehicle_id = $1',[vehicle_id],(err,priceRes)=>{
            if (err) {
                    res.status(400).json({ message: "Error fetching price" });
                  } else {

                    res
                    .status(200)
                    .json({
                      vehicle: results.rows[0],
                      request: priceRes.rows[0],
                      owner: ownerRes.rows[0],
                    });


                  }


          })
          //   owner,
          //   [results.rows[0].user_id],
          //   (err, ownerRes) => {
          //     if (err) {
          //       res.status(400).json({ message: "Error fetching school" });
          //     } else {
               

              }
        
        
      }); //parent call
    }
  }); //request call
};
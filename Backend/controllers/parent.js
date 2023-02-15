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

//create school

// exports.createPost = async (req, res) => {
//     const {user_id,title,post,post_date} = req.body;
//     try {
         
//           const data = await client.query(
//             `INSERT INTO posts (user_id,title,post,post_date) VALUES ($1,$2,$3,$4);`,
//             [user_id,title,post,post_date],
//             (err) => {
//               if (err) {
           
//                 console.error(err);
//                 return res.status(500).json({
//                   error: "Database error",
//                 });
//               } else {
//                 res
//                   .status(200)
//                   .send({ message: `Post for user ${user_id} have been added to the database`});
//               }
//             }
//           );
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({
//         error: "Database error while creating post!", //Database connection error
//       });
//     }
//   };
  
  //vehicle query
  
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

  exports.getVehicleUser = async (req, res) => {
    const user_id = parseInt(req.params.id);
    try {
          //get all post form the database
          const data = await client.query(
            `SELECT * FROM vehicle where owner_id = $1`,
            [user_id],
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
                  .json(result.rows);
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

    
  // exports.getSchoolVehicle = async (req, res) => {
  //   const school_id = parseInt(req.params.id);
  //   try {
         
  //         const data = await client.query(
  //           `SELECT * FROM school where school_id = $1`,
  //           [school_id],
  //           (err,result) => {
  //             if (err) {
            
  //               console.error(err);
  //               return res.status(500).json({
  //                 error: "Database error",
  //               });
  //             } else {
  //               res
  //                 .status(200)
  //                 .send(result.rows);
  //             }
  //           }
  //         );
  //   } catch (err) {
  //     console.log(err);
  //     res.status(500).json({
  //       error: "Database error", //Database connection error
  //     });
  //   }
  // };



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
  
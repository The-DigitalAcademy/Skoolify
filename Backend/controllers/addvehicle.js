
const client=require('../config/db_config')


exports.addvehicle = async (req, res)=>{
    const {owner_id,vehicle_reg,model,brand,driver_name,driver_cellphone,driver_image,document,color,vehicle_image} = req.body;

  try {
        //Inserting data into the database
        const data = await client.query(
          `INSERT INTO vehicle (owner_id,vehicle_reg,model,brand,driver_name,driver_cellphone,driver_image,document,color,vehicle_image) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);`,
          [owner_id,vehicle_reg,model,brand,driver_name,driver_cellphone,driver_image,document,color,vehicle_image],
          (err) => {
            if (err) {
           //If post is not inserted is not inserted to database
              console.error(err);
              return res.status(500).json({
                error: "Database error",
              });
            } else {
              res
                .status(200)
                .send({ message: `Post for user ${owner_id} have been added to the database`});
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

//get all  vehicles quu

exports.viewvehicle = async (req, res) => {
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





const client=require('../config/db_config')


exports.addvehicle = async (req, res)=>{
    const {owner_id,vehicle_reg,model,brand,driver_name,driver_cellphone,driver_image,document,color,vehicle_image} = req.body;
  console.log({owner_id,vehicle_reg,model,brand,driver_name,driver_cellphone,driver_image,document,color,vehicle_image});
  try {
        //Inserting data into the database
        const data = await client.query(
          `INSERT INTO vehicle (owner_id,vehicle_reg,model,brand,driver_name,driver_cellphone,driver_image,document,color,vehicle_image,is_deleted) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11);`,
          [owner_id,vehicle_reg,model,brand,driver_name,driver_cellphone,driver_image,document,color,vehicle_image,false],
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
                .json({ message:'Vehicle added'});
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
          `SELECT * FROM vehicle where owner_id = $1 AND is_deleted = false`,
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

exports.removeVehicle = async (req, res) => {
  const vehicle_id = req.params.vehicle_id
  try {
        //get all post form the database
        const data = await client.query(
          `UPDATE vehicle SET is_deleted = $2  where vehicle_id = $1`,
          [vehicle_id,true],
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
                .json({message:"Vehicle removed"});
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


exports.editDriver = async (req, res) => {
  const vehicle_id = req.params.vehicle_id
  const {driver_name, driver_cellphone, driver_image} = req.body;

  console.log(driver_image);

  const sql = "UPDATE vehicle SET driver_name = $1, driver_cellphone = $2 , driver_image = $3 WHERE vehicle_id = $4"
  client.query(sql,[driver_name,driver_cellphone,driver_image,vehicle_id],(err,results)=>{
    if(err)
    {
      console.log(err);
      res.status(401).json({message:'Database error while updating vehicle'})
    }else{
      res.status(201).json({message:'Driver updated successfully'})
    }

  })

}






exports.getvehicle = async (req, res) => {
  const vehicle_id = parseInt(req.params.id);
  try {
        //get all post form the database
        const data = await client.query(
          `SELECT * FROM vehicle where vehicle_id = $1`,
          [vehicle_id],
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
                .json(result.rows[0]);
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

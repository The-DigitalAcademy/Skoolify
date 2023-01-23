const client = require("../config/db_config");

exports.viewSchools = (req, res) => {
  const sql = "SELECT * FROM school WHERE is_deleted = false";

  client.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: "Error fetching owners" });
    } else {
      res.status(200).json(results.rows);
    }
  });
};

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

exports.viewSchoolTransporters = (req, res) => {
  const school_id = req.params.school_id;
  const sql = "SELECT * FROM vehicle_owner WHERE school_id = $1";

  client.query(sql, [school_id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: "Error fetching school" });
    } else {
      res.status(200).json(results.rows);
    }
  });
};



exports.addSchool = (req, res) => {
  const { school_name, school_location } = req.body;
  const sql =
    "INSERT INTO school (school_name,school_location,is_deleted) values($1,$2,$3)";

  client.query(sql, [school_name, school_location, false], (err, results) => {
    if (err) {
      res.status(401).json({ message: "Error inserting school" });
    } else {
      res.status(201).json({ message: "School successfully added" });
    }
  });
};

exports.removeSchool = (req, res) => {
  const school_id = req.params.school_id;
  const sql = "UPDATE school SET is_deleted = $1 WHERE school_id = $2";

  client.query(sql, [true, school_id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(401).json({ message: "Error deleting school" });
    } else {
      res.status(201).json({ message: "School successfully deleted" });
    }
  });
};

exports.viewAllOwners = (req, res) => {
  const sql = "SELECT * FROM users WHERE account = 'OWNER'";

  client.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: "Error fetching owners" });
    } else {
      res.status(200).json(results.rows);
    }
  });
};
exports.viewAllApplications = (req, res) => {
  const sql = "SELECT * FROM application";

  client.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: "Error fetching applications" });
    } else {
      res.status(200).json(results.rows);
    }
  });
};
exports.viewApplication = (req, res) => {
  const application_id = req.params.application_id;
  const sql = "SELECT * FROM application WHERE application_id = $1";

  client.query(sql, [application_id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: "Error fetching application" });
    } else {
      res.status(200).json(results.rows);
    }
  });
};

exports.declineApplication = (req, res) => {};

exports.approve = (req, res) => {
  const { owner_id, school_id, vehicle_id } = req.params;
  const sql =
    "INSERT INTO vehicle_owner (owner_id, school_id, vehicle_id) VALUES ($1, $2, $3)";

  client.query(sql, [owner_id, school_id, vehicle_id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: "Error insert owner into school" });
    } else {
      //archive the application after accepting
      //Send email to the owner
      res.status(200).json({ message: "Application approved" });
    }
  });
};

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

exports.ownerVehicles = (req, res) => {
  const user_id = req.params.user_id;
  const sql = "SELECT * FROM vehicle WHERE owner_id = $1";

  client.query(sql, [user_id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: "Error fetching vehicles" });
    } else {
      res.status(200).json(results.rows);
    }
  });
};

exports.ViewVehicle = (req, res) => {
  const vehicle_id = req.params.vehicle_id;
  const sql = "SELECT * FROM vehicle WHERE vehicle_id = $1";

  client.query(sql, [vehicle_id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: "Error fetching vehicle" });
    } else {
      res.status(200).json(results.rows);
    }
  });
};

exports.suspendOwner = (req, res) => {
  const user_id = req.params.user_id;
  const sql = "UPDATE users SET is_suspended = $1 WHERE user_id = $2";

  client.query(sql, [true, user_id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(401).json({ message: "Error suspending account" });
    } else {
      res.status(201).json({ message: "Successfully suspended" });
    }
  });
};
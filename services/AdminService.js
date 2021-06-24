const db_connect = require("../utilities/db_connect");

exports.add_teacher_service = async (teacher_id, teacher_name, res) => {
  const q = `INSERT INTO teachers (teacher_id, teacher_name) VALUES (?,?);`;

    let rows = await db_connect.query(q, [teacher_id, teacher_name])
    return true;
};

exports.fetch_teachers_service = async (res) => {
  const q = `SELECT * FROM teachers;`;

 db_connect.query(q, (err, rows, fields)=>{
      if(err)
        throw err
      else
        res.send(rows)
  });
  
};

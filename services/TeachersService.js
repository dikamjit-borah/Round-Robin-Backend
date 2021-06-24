const db_connect = require("../utilities/db_connect");

exports.fetch_week_view = async (teacher_id, week_start_date, week_end_date, res) => {
    const q = `SELECT * FROM schedules WHERE teacher_id = ? AND scheduled_date >= ? AND scheduled_date <= ? ;`;
  
    //console.log(teacher_id, week_start_date, week_end_date);
    db_connect.query(q, [teacher_id, week_start_date, week_end_date], (err, result)=>{
      if(err)
        throw err;
      else
      {
        console.log(result);
        res.send(result)
      }
        
    })
    
  };

  exports.insert_into_schedules = async (user_inputs, res ) =>{

    const q = `INSERT into schedules (schedule_id, teacher_id, teacher_name, scheduled_topic, scheduled_date, scheduled_start_time, scheduled_end_time) VALUES (?,?,?,?,?,?,?);`;
  
    await db_connect.query(q, user_inputs)
    return true;

  }
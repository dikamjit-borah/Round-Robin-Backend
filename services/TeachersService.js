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



  exports.fetch_day_view = async (teacher_id, scheduled_date, res) => {
    const q = `SELECT * FROM schedules WHERE teacher_id = ? AND scheduled_date = ? ;`;
  
    db_connect.query(q, [teacher_id, scheduled_date], (err, result)=>{
      if(err)
        throw err;
      else
      {
        console.log(result);
        res.send(result)
      }
        
    })
    


  };



  exports.fetch_month_view = async (teacher_id, res) => {
    const q = `SELECT scheduled_date, COUNT(scheduled_date) FROM schedules WHERE teacher_id = ? GROUP BY scheduled_date;`;
  
    db_connect.query(q, [teacher_id], (err, result)=>{
      if(err)
        throw err;
      else
      {
        console.log(result);
        res.send(result)
      }
        
    })
  }



  

  exports.insert_into_schedules = async (user_inputs, res ) =>{

    console.log(user_inputs["scheduled_date"]);
    console.log("For new schedule, ", user_inputs);

    

    const q1 = `SELECT scheduled_start_time, scheduled_end_time from schedules WHERE teacher_id = ? AND scheduled_date = ?`

    db_connect.query(q1, [user_inputs[0], user_inputs[4]], (err, result) => {
      if(err)
        throw err;
      else{
        //console.log( );
        if(checkIfValidTime(result, user_inputs[5], user_inputs[6]))
        {
          insertIntoDb(user_inputs, res)
          
        }
        else
        {
          res.json({status:200, isValidStart:false})
        }
      }
    })
  }

  function insertIntoDb(user_inputs, res)
  {
    const q = `INSERT into schedules (schedule_id, teacher_id, teacher_name, scheduled_topic, scheduled_date, scheduled_start_time, scheduled_end_time) VALUES (?,?,?,?,?,?,?);`;
  
    db_connect.query(q, user_inputs, (err, result)=>{
      if(err)
        res.json({status:500, message:err})
      else{
        res.json({status:200, isValidStart:true})
      }
    })

  }

  function checkIfValidTime(arrayOfTimes, scheduledStart, scheduledEnd)
  {
    let scheduledStart24 = convertTo24HrInt(scheduledStart)
    let scheduledEnd24 = convertTo24HrInt(scheduledEnd)
    for(let i = 0; i<arrayOfTimes.length; i++)
    {
      let start24 = convertTo24HrInt(arrayOfTimes[i]["scheduled_start_time"])
      let end24 = convertTo24HrInt(arrayOfTimes[i]["scheduled_end_time"])

      if(scheduledStart24>=start24 && scheduledStart24<=end24)
      {
        console.log("Did not insert because of time overlap");
        return false;
      }
     
    }

    return true
  }

  function convertTo24HrInt(hrsStr)
  {
    return hrsStr.replace(":", "").split(":")[0]
  }
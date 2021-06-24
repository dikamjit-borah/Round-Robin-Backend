const db_connect = require("../utilities/db_connect");

const teacher_service = require("../services/TeachersService")


exports.get_week_data = async (req, res) => {
    

    let teacher_id = req.query["teacher_id"]
    let start_date = req.query["week_start_date"]
    let end_date = req.query["week_end_date"]


    console.log(teacher_id);
    let rows =  teacher_service.fetch_week_view(teacher_id, start_date, end_date, res);
  //  res.send({ status: 200, message: rows });
  };
  

  exports.add_new_schedule = async(req, res) =>{
    let schedule_id = new Date().valueOf()
    let teacher_id = req.body["teacher_id"]
    let teacher_name = req.body["teacher_name"]
    let scheduled_topic = req.body["scheduled_topic"]
    let scheduled_date = req.body["scheduled_date"]
    let scheduled_start_time = req.body["scheduled_start_time"]
    let scheduled_end_time = req.body["scheduled_end_time"]

    console.log("Creating a new schedule");

    let user_inputs = [schedule_id, teacher_id, teacher_name, scheduled_topic, scheduled_date, scheduled_start_time, scheduled_end_time]

    let inserted = await teacher_service.insert_into_schedules(user_inputs, res);

    if(inserted)
        res.json({status:200, message:`Scheduled ${scheduled_topic} for ${scheduled_date}`})
    

  }
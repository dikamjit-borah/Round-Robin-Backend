const admin_service = require("../services/AdminService");

exports.add_teacher = async (req, res) => {
  let teacher_id = new Date().valueOf();
  let teacher_name = req.body["teacher_name"];

  let inserted = false;
  console.log("Creating teacher ", teacher_id);
  inserted = await admin_service.add_teacher_service(
    teacher_id,
    teacher_name,
    res
  );

  if (inserted)
    res.json({ status: 200, message: `Teacher ${teacher_name} created` });
};

exports.fetch_teachers = async (req, res) => {
  console.log("Fetching all teachers");
  let rows =  admin_service.fetch_teachers_service(res);
//  res.send({ status: 200, message: rows });
};

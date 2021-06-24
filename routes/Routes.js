const express = require("express");
const router = express.Router();
const admin_controller = require("../controllers/AdminController");
const teacher_controller = require("../controllers/TeacherController");


router.post("/add_teacher", admin_controller.add_teacher);
router.get("/all_teachers", admin_controller.fetch_teachers);
router.get("/week_view", teacher_controller.get_week_data)
router.get("/day_view", teacher_controller.get_day_data)
router.post("/add_schedule", teacher_controller.add_new_schedule)



module.exports = router
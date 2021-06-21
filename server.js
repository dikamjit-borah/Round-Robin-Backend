//const config = require("./config/config.json");
const cors = require("cors");
const dotenv = require("dotenv").config();
const express = require("express");



//const admin_routes = require("./routes/user_routes");

const app = express();
const port = process.env.PORT || 3000;

var corsOptions = {
  origin: `http://localhost:${port}`,
}; 

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use("/api", admin_routes);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
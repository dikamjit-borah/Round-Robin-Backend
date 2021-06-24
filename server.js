//const config = require("./config/config.json");
const cors = require("cors");
const dotenv = require("dotenv").config();
const express = require("express");
const db_connect = require("./utilities/db_connect");

const routes = require("./routes/Routes");

const app = express();
const port =  process.env.PORT || 8080;

var corsOptions = {
  origin: `http://localhost:${port}`,
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.listen(port, () => {

  console.log(`App running on port ${port}`);
});

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();

require('./db/conn');

app.use(bodyParser.json());
app.use(cors());

app.use("/api/", require("./routes/employees"));

const port = process.env.PORT;

app.listen(port, async() => {
  const timing = new Date();
  console.log(`App is listing on ${port} at: ${timing}`);
});
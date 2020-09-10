const express = require("express");
const cors = require("cors");
const config = require("config");

const app = express();

require("./startup/routes")(app);
require("./startup/db")();
app.use(cors());
require("./startup/config")();

const port = config.get("port");
const server = app.listen(port, () =>
  console.info(`Listening on port ${port}...`)
);

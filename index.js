const express =  require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const morgan = require("morgan");

// cors, morgan and express configuration
app.use(cors());
app.options('*', cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api", require("./routes/index"));

// server configuration and start server en railway
let server = app.listen(process.env.PORT || 8080, function(){
    let port = server.address().port;
    console.log(`Server on port ${port}`)
  });
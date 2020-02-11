const express = require("express");
const expressSession = require("express-session");
const cors = require('cors');
const morgan = require('morgan');
const router = require('./routes/auth');
const { dbConnect } = require("./db/connection");
const { config } = require('dotenv');

// MongoDB Connection
dbConnect();
// End

config();

const app = express();
app.use(morgan("dev"));

app.use(
  expressSession({
    name: "sid",
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { 
      // secure: true,
    }
  })
)
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use("/api", router);

app.listen(process.env.PORT, () => console.log("Server is running..."));
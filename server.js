const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./helpers/database/connectDatabase");
const routers = require("./routers");
const customErrorHandler = require("./middlewares/error/customErrorHandler");
const { restart } = require("nodemon");


//Environment Variables
dotenv.config({
    path: "./config/env/config.env"
});

//MongoDb Connection
connectDatabase();

//localhost:5000/api/questions
//localhost:5000/api/auth


const app = express();

//Express - Body Middleware
app.use(express.json());
const PORT = process.env.PORT;


//routers Middleware
app.use("/api",routers);

//Error Handler
app.use(customErrorHandler);

app.listen(PORT, ()=>{
    console.log(`App started on ${PORT} : ${process.env.NODE_ENV}`);
})

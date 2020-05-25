require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const userRouter = require("./api/users/UserRouter");
const itemRouter = require("./api/items/ItemRouter");

app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
    next();
  
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/users", userRouter);

app.use("/api/items", itemRouter);

app.listen(process.env.APP_PORT, () => {
    console.log(`Server running on port ${process.env.APP_PORT}`);
});

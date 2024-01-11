const express = require('express')
const db =require("./db")
const app = express()
const bodyParser = require('body-parser');
const student = require("./students")
const professor= require("./professor")
const subject = require("./subjects")
const comment = require("./comments")


  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  
  app.use("/students",student)
  app.use("/professors",professor)
  app.use("/subjects",subject)
  app.use("/comments",comment)
  
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
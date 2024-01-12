const express = require('express')
const db =require("./db")
const app = express()
const bodyParser = require('body-parser');
const student = require("./students")
const professor= require("./professor")
const subject = require("./subjects")
const comment = require("./comments")
const file = require("./files")

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  
  app.use("/students",student)
  app.use("/professors",professor)
  app.use("/subjects",subject)
  app.use("/comments",comment)
  app.use("/files",file)
  
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

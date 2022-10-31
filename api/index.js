const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const  morgan = require('morgan') 
const connectDB = require('./connection')
const app = express()
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const postRoute = require("./routes/posts");
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  });
connectDB()
app.get('/',( req,res) =>{
    res.send("hello")
})
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))
app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)
app.use("/api/posts", postRoute);






app.listen(3000,() =>{
    console.log("Backend server is running")
})
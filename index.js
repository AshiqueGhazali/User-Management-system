const express = require("express")
const mongoose =require("mongoose")
const path = require("path")
const nocache = require('nocache')

mongoose.connect("mongodb://127.0.0.1:27017/user_management_system");
const app = express();

const userRoute = require("./routes/userRout")

app.use(nocache());

app.use("/", userRoute)

const adminRoute = require("./routes/adminRout")
app.use("/admin", adminRoute)

app.use(express.static('public'));
app.use('/assets',express.static(path.join(__dirname,'public/assets')))



const port = process.env.PORT ||3000;

app.listen(port, ()=>{
    console.log("server is running.");
})
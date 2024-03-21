const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    fname:{
        type:String,
        requred:true
    },
    sname:{
        type:String,
        requred:true
    },
    email:{
        type:String,
        requred:true
    },
    username:{
        type:String,
        requred:true
    },
    mobile:{
        type:String,
        requred:true
    },
    image:{
        type:String,
        requred:true
    },
    password:{
        type:String,
        requred:true
    },
    is_admin:{
        type:Number,
        requred:true
    },
    is_verified:{
        type:Number,
        default:0
    }
})

module.exports=mongoose.model("User", userSchema)


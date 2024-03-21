const express = require('express')
const session = require('express-session')
const config = require('../configuration/config')
const bodyParser =require('body-parser')


const admin_rout = express()


admin_rout.use(session({
    secret:config.sessionSecret,
    resave: false,
    saveUninitialized: false
}))

admin_rout.use(bodyParser.json())
admin_rout.use(bodyParser.urlencoded({extended:true}))

const adminController = require("../controller/adminController")

admin_rout.set('view engine', 'ejs')
admin_rout.set('views','./view/admin')
const auth = require('../middleware/adminAuth')


admin_rout.get('/' ,auth.isLogout, adminController.loadLogin)


admin_rout.post('/',adminController.verifyLogin)

admin_rout.get('/home',auth.isLogin, adminController.loadDashboard)
admin_rout.get('/logout',auth.isLogin, adminController.logout)
admin_rout.get('/dashboard',auth.isLogin,adminController.adminDashboard)
admin_rout.get('/new-user',auth.isLogin,adminController.newUserLoad)
admin_rout.post('/new-user',adminController.addUser)
admin_rout.get('/edit-user',auth.isLogin,adminController.editUserLoad)
admin_rout.post('/edit-user',adminController.updateUsers)
admin_rout.get('/delete-user',adminController.deleteUser)
admin_rout.get('/search',adminController.searchUser)

admin_rout.get('*',function(req,res){
    res.redirect('/admin')
})


module.exports = admin_rout
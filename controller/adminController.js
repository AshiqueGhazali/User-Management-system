const User = require('../model/userModel')
const bcrypt = require('bcrypt')


const securePassword = async (password)=>{
    try {
      const passwordHash = await bcrypt.hash(password, 10)
      return passwordHash;
    
    } catch (error) {
       console.log(error.message);
       
    }
 }

const loadLogin = async(req,res)=>{
    try {
        res.render('login')
    } catch (error) {
        console.log(error.message);
        
    }
}

const verifyLogin = async(req,res)=>{
    try {
        const email = req.body.email
        const password = req.body.password

        const adminData=await User.findOne({email:email})
        if(adminData){
            const passwordMatch = await bcrypt.compare(password,adminData.password)

            if(passwordMatch){
                if(adminData.is_admin===0){
                    res.render('login',{message:"email and password is incorrect"})

                }else{
                    req.session.admin_id = adminData._id
                    res.redirect('/admin/home')

                }

            }else{
                res.render('login',{message:"email and password is incorrect"})
            }

        }else{
            res.render('login',{message:"email and password is incorrect"})

        }

        
    } catch (error) {
        console.log(error.message);
        
    }
}

const loadDashboard =async(req,res)=>{
    try {
        const userData =await User.findById({_id:req.session.admin_id})
        res.render('home',{user:userData})
    } catch (error) {
        console.log(error.message);
    }
}

const logout =async(req,res)=>{
    try {
        req.session.destroy();
        res.redirect('/admin')
        
    } catch (error) {
        console.log(error.message);
        
    }
}

const adminDashboard = async(req,res)=>{
    try {
        const usersData = await User.find({is_admin:0})
        res.render('dashboard',{users:usersData})
        
    } catch (error) {
        console.log(error.message);
        
    }
}
const newUserLoad = async (req,res)=>{
    try {
        res.render('new-user')
        
    } catch (error) {
        console.log(error.message);
    }
}

const addUser =async(req,res)=>{
    try {
        const fname = req.body.fname
        const sname= req.body.sname
        const email = req.body.email
        const username =req.body.username
        const password = req.body.password

        const spassword = await securePassword(password)

        const user = new User ({
            fname:fname,
            sname:sname,
            email:email,
            username:username,
            password:spassword,
            is_admin:0
        })
        
        const userData = await user.save()

        if(userData){
            res.redirect('/admin/dashboard')

        }else{
            res.render('new-user',{message:"somthing happen wrong..."})
        }


    } catch (error) {
        console.log(error.message);
    }

}

const editUserLoad = async(req,res)=>{
    try {

        const id=req.query.id
        const userData = await User.findById({_id:id})
        if(userData){
            res.render('edit-user',{user:userData})
        }else{
            res.redirect('/admin/dashboard')

        }
        
    } catch (error) {
        console.log(error.message);
    }
}
const updateUsers= async(req,res)=>{
    try {

       const userData = await User.findByIdAndUpdate({_id:req.body.id},{$set:{
                fname:req.body.fname,
                sname:req.body.sname,
                email:req.body.email,
                username:req.body.username}})

        res.redirect('/admin/dashboard')
        
    } catch (error) {
        console.log(error.message);
    }
}

const deleteUser = async(req,res)=>{
    try {

        const id = req.query.id
        console.log(id)
        if(id){
            await User.deleteOne({_id:id})
            return res.redirect('/admin/dashboard')
        }


    } catch (error) {
        console.log(error.message);
    }
}


const searchUser = async (req, res) => {
    try {
      let users = [];
      if (req.query.search) {
        users = await User.find({ fname: { $regex: req.query.search, $options: 'i' } });
      } else {
        users = await User.find();
      }
      res.render('dashboard', { users:users });
    } catch (error) {
      console.log(error.message);
      res.render('error'); 
    }
 };

module.exports={
    loadLogin,
    verifyLogin,
    loadDashboard,
    logout,
    adminDashboard,
    newUserLoad,
    addUser,
    editUserLoad,
    updateUsers,
    deleteUser,
    searchUser
    
}
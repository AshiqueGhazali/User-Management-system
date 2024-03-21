const User = require("../model/userModel")
const bcrypt = require("bcrypt")

const securePassword = async (password)=>{
   try {
     const passwordHash = await bcrypt.hash(password, 10)
     return passwordHash;
   
   } catch (error) {
      console.log(error.message);
      
   }
}

const loadRegister = async (req, res)=>{
   try {
      
      res.render('registration')
    
   } catch (error) {
    console.log(error.message);
    
   }
}

const insertUser = async (req,res)=>{
   try {
      const spassword = await securePassword(req.body.password)
      const user = new User({
         fname:req.body.fname,
         sname:req.body.sname,
         username:req.body.username,
         email:req.body.email,
         password:spassword,
         is_admin:0

      })
      if(user.username[0]==" "){
         res.render('registration',{message:"Enter a valid username"})
      }else if(user.fname[0]==" "||user.sname==" "){
         res.render('registration',{message:"Enter a valid Name"})
      }

      const userData = await user.save();

      if(userData){

         res.render('login',)
      }else{
         res.render('registration',{message:"sign Up failed"})
      }
      
   } catch (error) {
      console.log(error.message);
      
   }
}

const loginLoad = async (req, res)=>{
   try {
      res.render('login')
   } catch (error) {
      console.log(error.message);
   }
}

const verifyLogin= async(req,res)=>{
   try {

      const username= req.body.userName;
      const password = req.body.password

      const userData = await User.findOne({username : username})

      if (userData) {
         const passwordMatch = await bcrypt.compare(password,userData.password)

         if (passwordMatch) {
            req.session.user_id = userData._id
            req.session.ashique =true
            res.redirect('/home')

            
         }else{
            res.render('login',{message:"User Name and Password is Incorrect"})
         }
      }else{
         res.render('login',{message:"User Name and Password is Incorrect"})
      }

   } catch (error) {
      console.log(error.message);
      
   }
}

const loadHome = async (req,res)=>{
   try {
      const userData = await User.findById({_id:req.session.user_id })
      res.render('home',{user:userData})
   } catch (error) {
      console.log(error.message);
      
   }

}

const userLogout = async(req, res)=>{
   try {
      console.log(req.session.ashique);
     delete req.session.ashique
      req.session.destroy()
      res.redirect('/login')
   } catch (error) {
      console.log(error.message);
   }
}

const editLoad = async (req, res) => {
   try {
      const id = req.query.id;

      if (!id) {
         return res.status(400).send('ID parameter is missing');
      }

      const userData = await User.findById(id);
      
      if (userData) {
         res.render('edit', { user: userData });
      } else {
         res.redirect('/home');
      }
   } catch (error) {
      console.log(error.message);
      res.status(500).send('Internal Server Error');
   }
}


const editProfile = async (req, res) => {
   try {
      const userId = req.body.user_id;
      const updatedData = {
         fname: req.body.fname,
         sname: req.body.sname,
         username: req.body.username,
         email: req.body.email
      };

      const userData = await User.findByIdAndUpdate(userId, updatedData, { new: true });

      if (userData) {
         res.redirect('/home');
      } else {
         res.status(404).send('User not found');
      }
   } catch (error) {
      console.log(error.message);
      res.status(500).send('Internal Server Error');
   }
}



module.exports ={
    loadRegister,
    insertUser,
    loginLoad,
    verifyLogin,
    loadHome,
    userLogout,
    editLoad,
    editProfile
}
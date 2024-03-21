const isLogin = async (req,res,next)=>{
    try {
        if(req.session.user_id){

        }else{
            return res.redirect('/')
        }
        next()
    } catch (error) {
        console.log(error.message);
        
    }
}


const aa = (req, res, next) => {
    try {
        if (!req.session.ashique) {
            next(); // Move to the next middleware
    } 
    } catch (error) {
        // Handle any errors that occur within the middleware
        console.error('Error in aa middleware:', error);
        res.status(500).send('Internal Server Error');
    }
};




const isLogout = async (req,res,next)=>{
    try {

        if(req.session.user_id){
            return res.redirect('/home')
        }
        next()
    } catch (error) {
        console.log(error.message);
        
    }
}

module.exports ={
    isLogin,
    isLogout,
    aa
}
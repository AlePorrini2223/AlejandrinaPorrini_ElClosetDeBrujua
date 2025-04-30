const userSessionCheck = (req,res,next) => {
   console.log(req.session.userLogin);
   
   if(req.session.userLogin){
      return next()
   }
   return res.redirect('/users/login')
}

module.exports = userSessionCheck;
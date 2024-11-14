const jwt = require('jsonwebtoken');

const jwtAuthMiddleWare = function (req , res , next){

    //Extracting the JWT token from the request
   const token = req.headers.authorization.split(' ')[1];

   //check the token 
   if(!token){
    return res.status(401).json({error : 'Unauthorized'});
   }


   try{
        //Verify the token
          const  decode = jwt.verify(token , process.env.JWT_SECRET);

          //Attach user information to the request object
          req.user = decode;
          next();

   }catch(error){
      console.log(error);
      res.status(401).json({error : 'Invalid Token'});
   }

}


//Token Generation

const generateToken = function (userData){
      return jwt.sign(userData , process.env.JWT_SECRET);
}
module.exports = {jwtAuthMiddleWare , generateToken};
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const app = express();
const db = require('./db')
const Person = require('./models/Person.js')
const Menu = require('./models/Menu.js')
const bodyParser = require('body-parser')
require('dotenv').config();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.use(passport.initialize());

passport.use(new LocalStrategy(async (username , password , done)=>{
   
   try{
      console.log("Recieved Credential : ", username);
      const user = await Person.findOne({username : username});

      if(!user){
        return done(null , false  , {message: 'Incorrect username'});
      }
      
      const isPasswordMatch = user.comparePassword(password);
    

      if(isPasswordMatch){
        return done(null , user , {message: 'Password Correct'});
      }
      else{
        return done(null , false , {message : 'Password Incorrect'});
      }


   }catch(error){

      return done(error);

   }
}))




app.get('/' , (req ,  res)=>{
  res.send("Welcome to Udhupiwala");
})

//MiddleWare
const authMiddleWare = passport.authenticate('local'  , {session : false});
const personRoutes= require('./routes/personRoutes.js');
app.use('/person', personRoutes);

const menuRoutes = require('./routes/menuRoutes.js');
app.use('/menu' ,  menuRoutes);

app.listen(PORT , ()=>{
    console.log("Server is running on http://localhost:3000");
});
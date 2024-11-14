const express = require('express');
const router = express.Router();
const Person = require('../models/Person');
const {jwtAuthMiddleWare , generateToken} = require('../jwt.js')

//To get the staff information 
router.get('/' , async (req , res) => {
      
    try{
       const staffInfo = await Person.find();
       console.log(staffInfo);
       res.status(200).json(staffInfo)
    }catch(error){
       console.log(error);
       res.status(500).json({error: 'Internal Server Error'});
    }
})

router.post('/login' , async function (req , res){
      
     const data = req.body;

     try{
        
        const user = await Person.findOne({username : data.username});

        //username check
        if(!user){
            return res.status(401).json({message : 'User not found'});
        }  
        
        console.log(data.password);
        //password check
        const isPasswordMatch = await user.comparePassword(data.password);
        console.log(typeof isPasswordMatch);
        if(!isPasswordMatch){
            return res.status(401).json({message : 'Password incorrect'});
        }

        //Token Generation
        const payload = {id: user.id , username: user.username , password: user.password};
        const token = generateToken(payload);
        return res.json({token: token});
        
     }catch(error){
          console.log(error);
          res.status(500).json({error: 'Internal Server Error'});
     }

}) 

router.post('/signup' , async (req , res) => {
    try{
          const data = req.body;
          const newPerson = new Person(data);
          const response = await newPerson.save();
          const payload = {
             username : response.username,
             id : response.id
          }
          console.log(JSON.stringify(payload));
          const token = generateToken(payload);

          res.status(200).json({response : response , token});
    }catch(error){
           console.log(error);
           res.status(500).json({error: 'Internal Server Error'});
    }
})

router.get('/profile' ,jwtAuthMiddleWare ,  async function (req , res){

    try{
        const userData = req.user;
        console.log(userData);
        const userId = userData.username;
        const user = await Person.findOne({username : userId});
        res.status(200).json({user});

    }catch(error){
            console.log(error);
            res.status(500).json({error : 'Internal Server Error'});
    }
})

router.get('/:workType' , async (req , res) => {
        try{
            const workType = req.params.workType;
            const data = await Person.find({work : workType});
            console.log(data);
            res.status(200).json(data);
        }catch(error){
            console.log(error);
            res.status(500).json({error: 'Internal Server Error'});
        }
})


router.delete('/:id' , async (req , res)=>{
    try{
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);

        if(!response){
           return  res.status(404).json({message: 'User not Found'});
           
        }

        console.log('Deleted Successfully');
        res.status(200).json(response);
    }catch(error){
             console.log(error);
             res.status(500).json({error: 'Internal Server Error'});
    }
})

module.exports = router;
 


const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

//To get the staff information 
router.get('/' , async (req , res) => {
      
    try{
        console.log("HELLO");
       const staffInfo = await Person.find();
       console.log(staffInfo);
       res.status(200).json(staffInfo)
    }catch(error){
       console.log(error);
       res.status(500).json({error: 'Internal Server Error'});
    }
})


router.post('/' , async (req , res) => {
    try{
          const data = req.body;
          const newPerson = new Person(data);
          const response = await newPerson.save();

          res.status(200).json(response);
    }catch(error){
           console.log(error);
           res.status(500).json({error: 'Internal Server Error'});
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
 


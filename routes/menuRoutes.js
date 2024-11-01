const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');



router.post('/' , async (req , res) => {

    try{

        const data = req.body;
        const newMenu = new Menu(data);
        const response = await newMenu.save();
        console.log(response);
        res.status(200).json(response);

    }
    catch(error){
            console.log(error);
            res.status(500).json({error : 'Internal Server Error'})
    }
      
})

router.get('/', async (req , res) =>{

    try{
        const data =  await Menu.find();
        console.log(data);
        res.status(200).json(data);
       
    }catch(error){
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
    
})


router.get('/:tasteType' , async (req , res) => {

    try{
        console.log(req.params);
        //parameter extract from request
        const tasteType = req.params.tasteType;
    
        //extracting data based on the parameter
        const reqData = await Menu.find({taste: tasteType});
        console.log(reqData);
        res.status(200).json(reqData);
    
    }catch(error){
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
   
    
})


router.put('/:id' , async (req , res) => {
 
    try{
        //extracting Id of a menu to change
        const updatingDataId = req.params.id;

        //extracting all updated Information
        const updateData = req.body;

        const response = await Menu.findByIdAndUpdate(updatingDataId , updateData , {
            new : true,
            runValidators: true,
        });

        if(!response){
            console.log('Data not found');
            res.status(404).json({message: 'Data not found'});
        }

        console.log('Data Updated');
        res.status(200).json(response);

    }catch(error){
             console.log(error);
             res.status(500).json({error: 'Internal Server Error'});
    }


})
module.exports = router;



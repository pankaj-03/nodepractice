//import mongoose library
const mongoose = require('mongoose');

//Mongoose URL
const mongooseURL = 'mongodb://localhost:27017/users';

//Set up Mongoose Connection
mongoose.connect(mongooseURL , {
    useNewUrlParser : true,
    useUnifiedTopology: true
});

//Default object connection 
const db = mongoose.connection;

db.on('connected' , ()=>{
    console.log('Connected to the MongoDB server');
})

db.on('disconnected' , ()=>{
    console.log('Disconnected from the MongoDB server');
})

db.on('error' , (error)=>{
    console.log('Error occured on MongDB server: ', error);
})


module.exports = db;
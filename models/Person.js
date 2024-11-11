const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: {type: String , required: true},
    age : {type: Number , required: true},
    work: {type: String , enum: ['chef' , 'waiter' , 'manager'] , required: true},
    mobile: {type : String , required: true},
    email: {type: String , unique: true , required: true},
    address: {type: String , required: true},
    salary: {type: String , required: true},
    username : {
        type : String,
        required: true,
    },
    password : {
        type: String,
        required: true
    }
})


//Create Person Model
const Person = mongoose.model('Person' , personSchema);
module.exports = Person; 
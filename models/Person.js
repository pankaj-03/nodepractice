const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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


//Bcrypting

personSchema.pre('save' , async function (next){
     const user = this;

     try{
          //checking whether the password is modified or not
          const isPasswordModified =   this.isModified("password");
          if(!isPasswordModified)return next();

          //hashing the password

          //salt generation
          const salt = await bcrypt.genSalt(10);

          //hashing the password
          const hashedPassword = await bcrypt.hash(user.password , salt);

          user.password = hashedPassword;
          next();

     }catch(error){
         return next(error);
     }
})


personSchema.methods.comparePassword = async function (candidatePassword){
    try{
          const isMatch = await bcrypt.compare(candidatePassword , this.password);
          return isMatch;
    }catch(error){
          throw(error);
    }
}
//Create Person Model
const Person = mongoose.model('Person' , personSchema);
module.exports = Person; 
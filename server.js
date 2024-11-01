const express = require('express');
const app = express();
const db = require('./db')
const Person = require('./models/Person.js')
const Menu = require('./models/Menu.js')
const bodyParser = require('body-parser')
app.use(bodyParser.json());


app.get('/' , (req,res)=>{
  res.send("Welcome to Udhupiwala");
})


const personRoutes= require('./routes/PersonRoutes.js');
app.use('/person' , personRoutes);

const menuRoutes = require('./routes/menuRoutes.js');
app.use('/menu' , menuRoutes);

app.listen(3000 , ()=>{
    console.log("Server is running on http://localhost:3000");
});
const express = require('express');
const app = express()
const path=require('path')
const morgan=require('morgan');
const mysql= require('mysql');
const myConnection = require('express-myconnection');

// Rutas 
const Rutas=require('./routes/rutas');
// configuraciones

app.set('port',process.env.PORT || 3000);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./views'));
//middlewares

app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use(myConnection(mysql,{
    host:'localhost',
    user:'root',
    password:'clinica2020',
    port:3310,
    database:'capacitaciones'
},'single'));

// Filas estaticas

app.use('/public',express.static(path.join(__dirname,'public')))

//Rutas
app.use('/',Rutas);

app.listen(app.get('port'),()=>{ 
    console.log("Server on port 3000")
})
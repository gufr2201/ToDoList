
const express = require('express');
const server = express();
require('dotenv').config();
const mysql = require('mysql2');
const joi = require('joi');
const cors = require('cors');
// import { ToastContainer } from 'react-toastify';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


server.use(cors());

server.use(express.json());

const db = mysql.createPool({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_DATABASE
});




exports.register = function register(req, res) {
    const {username, password} = req.body;
    const sqlInsert = 'INSERT INTO user_info (username, password) VALUES (?, ?)'
    const schema = joi.object({
        username: joi.string().min(4).max(20).required(),
        password: joi.string().min(4).max(20).required(),
    });
    const validation = schema.validate({username: username, password: password});
    if (!validation.error) 
    {
            db.query(sqlInsert, [username, password], (error, result) => {
                if (error) {
                    // res.status(403).json('Du måste ange minst 4 tecken i både användarnamn och lösenord');

                         res.status(500).json('Internal Server Error');
                         return;
                } else 
                {
                  res.status(201).json('Du har registrerat en användare');
                
                }
            
       }
       )}
       if(validation.error) {
        res.status(400).json('Både användarnamn och lösenord måste vara minst fyra tecken långt.') // denna visas ej
       }
  
};



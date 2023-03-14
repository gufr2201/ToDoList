const express = require('express');
const server = express();
require('dotenv').config();
const mysql = require('mysql2');
const joi = require('joi');
const cors = require('cors');
const jwt = require('jsonwebtoken');

server.use(cors());

server.use(express.json());

const db = mysql.createPool({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_DATABASE
});

 
exports.login = function (req, res) {
    const {username, password} = req.body;
    const secret = process.env.SECRET;
    const sqlInsert = 'SELECT * FROM user_info where username = ? AND password = ?'

    db.query(sqlInsert, [username, password], (error, result) => {
        if (error) {
            res.send({error: error})
            return;
        } 
            if(result.length > 0) {
                const authToken = jwt.sign({username}, secret, {expiresIn: 120});
                res.cookie('authToken', authToken, {
                    maxAge: 360000,
                    sameSite: 'none',
                    secure: true,
                    httpOnly: false
                }); 
console.log(authToken);

                    res.status(200).json('Login successful');
            } else {
                res.send({message: 'Du har angett fel användarnamn eller lösenord'})
            }
            
        
        // if (result.length > 0) {

            //     res.status(200).json('Login successful');
            // } else {
            //     res.send({message: 'Du har angett fel användarnamn eller lösenord'})
            // }
        
    })
};
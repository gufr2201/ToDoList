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
    const secret = process.env.JWT_SECRET;
    const sqlInsert = 'SELECT * FROM user_info where username = ? AND password = ?';
    const schema = joi.object({
        username: joi.string().min(4).max(20).required(),
        password: joi.string().min(4).max(20).required(),
      });
      const validation = schema.validate({username: username, password: password});
      if (!validation.error) 
          {
            db.query(sqlInsert, [username, password], (error, result) => {
                        if (error) {
                            res.send({error: error})
                            return;
                        } 
                            if(result.length > 0) {
                                const authToken = jwt.sign({username}, secret, {expiresIn: 1200000});
                                res.cookie('authToken', authToken, {
                                    maxAge: 360000000,
                                    sameSite: 'none',
                                    secure: true,
                                    httpOnly: false
                                }); 
                // console.log(authToken);
      
        res.status(200).json('Du loggades in');
                    } else {
                        res.status(401).json('Du har angett fel användarnamn eller lösenord')
                        // res.send({message: 'Du har angett fel användarnamn eller lösenord'})
                    }

                
      }

        
    )}
};
const express = require('express');
const server = express();
require('dotenv').config();
const mysql = require('mysql2');
const joi = require('joi');
const cors = require('cors');
server.use(cors());

server.use(express.json());

const db = mysql.createPool({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_DATABASE
});

server.post('/register/post', (req, res) => {
    const {username, password} = req.body;

    const sqlInsert = 'INSERT INTO user_info (username, password) VALUES (?, ?)'
    db.query(sqlInsert, [username, password], (error, result) => {
        if (error) {
            console.log(error);
        }
    })
})

// server.post('/register/post', (req, res) => {
//     const {username, password} = req.body;
//     const sqlInsert = "INSERT INTO user_info (username, password) VALUES (?, ?)";
//     db.query(sqlInsert, [username, password], (error, result) => {
//         if (error) {
//             console.log(error);
//         }
//     });
// });
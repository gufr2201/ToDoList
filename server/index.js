const express = require('express');
require('dotenv').config();
const server = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const joi = require('joi');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { AuthenticationRoute } = require('../client/src/pages/routes/AuthenticationRoute');
//Här hämtar jag info från .env-filen för att skapa en anslutning till databasen
const db = mysql.createPool({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_DATABASE
});


server.use(cors({
    origin: 'http://localhost:3000',
    credentials: true}
));
server.use(express.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(cookieParser());

server.use('/authentication', AuthenticationRoute);


server.post('/api/post', (req, res) => {
    const {todo_task} = req.body;
    const sqlInsert = "INSERT INTO todo (todo_task) VALUES (?)";
    db.query(sqlInsert, [todo_task], (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});


// server.get('/api/get', (req, res) => {
//         const schema = joi.object({
//         todo_task: joi.string()
//     });
//     const validation = schema.validate(req.query);

//     if (validation.error) {
//         res.status(400).send(validation.error.details[0].message)
//     }
//     const {todo_task} = validation.value;
//     const sqlGet ='SELECT * FROM todo where todo_task=?'; 
//     db.query(sqlGet, [todo_task], (error, result) => {
//         if(error){
//             res.sendStatus(500);
//             console.log(error);
//         } else {
//             res.status(200).json(result);
//             console.log(result);

//         }
//     })
// })

server.get('/api/get', (req, res) => {
    const {authToken} = req.cookies;
    const schema = joi.object({
        todo_task: joi.string()
    });
console.log(authToken);
console.log(req)
    const validation = schema.validate(req.query);
//kolla om jag kan göra en middleware som kontrollerar om användaren har en authToken för att logga in. 
    const sqlGet = "SELECT * FROM todo";
    db.query(sqlGet, (error, result) => {
        if(validation.error) {
            console.log(error);
            res.sendStatus(500);
            //TODO skriv res.sendStatus(500 eller den felkod som gäller)
        }else {
        res.status(200).json(result); // ändrade från res.send(result) till res.json(result);
        }
    })
});

server.post('/api/post', (req, res) => {
    const {todo_task} = req.body;
    const sqlInsert = "INSERT INTO todo (todo_task) VALUES (?)";
    db.query(sqlInsert, [todo_task], (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

server.delete('/api/remove/:id', (req, res) => {
    const { id } = req.params;
    const sqlRemove = "DELETE FROM todo WHERE id = ?";
    db.query(sqlRemove, [id], (error, result) => {
        if (error) {
            console.log(error);
        }
        //TODO Här border det vara en res.sendStatus(200 eller något). Kör detta på varje del
    });
});

server.get('/api/get:id', (req, res) => {
    const { id } = req.params;
    const sqlGet = "SELECT * FROM todo where id = ?";
    db.query(sqlGet, [id], (error, result) => {
        if(error) {
            console.log(error);
        }
        res.send(result);
    });
});

server.patch('/api/update/:id', (req, res) => {
    const { id } = req.params;
    const { todo_task } = req.body;
    const sqlUpdate = "UPDATE todo SET todo_task = ? WHERE id = ?";
    db.query(sqlUpdate, [todo_task, id], (error, result) => {
        if(error) {
            console.log(error);
        }
        res.send(result);
    });
});




server.listen(5000, () => {
    console.log('Server is running on port 5000');
})

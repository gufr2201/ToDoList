const express = require('express');
require('dotenv').config();
const server = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const joi = require('joi');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { AuthenticationRoute } = require('./routes/AuthenticationRoute');
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
// server.use(bodyParser.urlencoded({extended: true}));
server.use(cookieParser());

server.use('/authentication', AuthenticationRoute);



server.get('/api/get', (req, res) => {
    const {authToken} = req.cookies;

    const schema = joi.object({
        todo_task: joi.string()
    });
    const validation = schema.validate(req.query);
    if(validation.error) {
        console.log(error);
        res.sendStatus(500);
        
    } else {
        console.log(authToken, process.env.JWT_SECRET);
        const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
        const username = decodedToken.username;
        const sqlGet = 'SELECT todo.id, todo.todo_task, user_info.username FROM todo INNER JOIN user_info ON todo.username = user_info.username WHERE todo.username = ?';
        db.query(sqlGet, [username], (error, result) => {
            if(error) {
                console.log(error);
                res.sendStatus(500);
            } else {
                res.status(200).json(result);
            }
        });

    }
    
});


server.post('/api/post', (req, res) => {
   
    const {authToken} = req.cookies;
    const {todo_task} = req.body;
    const schema = joi.object({
        todo_task: joi.string().required()
    });

    if(!todo_task || todo_task.trim() === '') {

        res.status(400).json('Du måste fylla i textfältet');
        return;
    }
    const validation = schema.validate(req.body);
    if(validation.error) {
        console.log(validation.error);
        res.sendStatus(400);
        return;
    }
    else {
        const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
        const username = decodedToken.username;
        const sqlInsert = "INSERT INTO todo (todo_task, username) VALUES (?, ?)";
        
        db.query(sqlInsert, [todo_task, username], (error, result) => {
            if (error) {
                console.log(error);
                res.status(500).json('Serverfel');
            } else {
                res.status(201).json('Du har lagt till en aktivitet till din att göra-lista');
    
            }
        });
    }
});

server.delete('/api/remove/:id', (req, res) => {
    const { id } = req.params;
    const sqlRemove = "DELETE FROM todo WHERE id = ?";
    db.query(sqlRemove, [id], (error, result) => {
        if (error) {
            console.log(error);
        }
       res.sendStatus(200);
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

const joi = require('joi');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');

const db = mysql.createPool({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_DATABASE
});

// server.post('/api/post', 


exports.postTodo = function (req, res) {
   
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
                res.sendStatus(500);
            } else {
                res.status(201).json('Du har lagt till en aktivitet till din att göra-lista');
    
            }
        });
    }
};
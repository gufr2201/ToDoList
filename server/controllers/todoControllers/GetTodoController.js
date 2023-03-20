const joi = require('joi');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');

const db = mysql.createPool({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_DATABASE
});



//Controller för att hämta alla aktiviteter den inloggade användaren har på sin att göra-listan.

exports.getTodo = function getTodo(req, res) {
    const {authToken} = req.cookies;
    const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
    const username = decodedToken.username;
    const sqlGet = 'SELECT todo.id, todo.todo_task, user_info.username FROM todo INNER JOIN user_info ON todo.username = user_info.username WHERE todo.username = ?';
    const schema = joi.object({
        todo_task: joi.string()
    });
    const validation = schema.validate(req.query);
    if(validation.error) {
        console.log(error);
        res.sendStatus(500);
        
    } else {
        db.query(sqlGet, [username], (error, result) => {
            if(error) {
                console.log(error);
                res.sendStatus(500);
            } else {
                res.status(200).json(result);
            }
        });

    }
    
};
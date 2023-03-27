const joi = require('joi');
const mysql = require('mysql2');

const db = mysql.createPool({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_DATABASE
});

//Controller för att ta bort en aktivitet från att göra-listan.

exports.deleteTodo = function(req, res) {
    const { id } = req.params;
    const sqlRemove = "DELETE FROM todo WHERE id = ?";
    const schema = joi.object({
        todo_task:joi.string()
    });
    const validation = schema.validate(req.body);
    if (validation.error) {
        console.log(validation.error);
        res.sendStatus(500);
    } else {
        db.query(sqlRemove, [id], (error, result) => {
            if (error) {
                console.log(error);
            } else {
                res.status(200).json('Du har tagit bort en aktivitet');
    
            }
        });
        
    }

};


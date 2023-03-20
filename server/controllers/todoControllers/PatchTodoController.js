const mysql = require('mysql2');
const joi = require('joi');

const db = mysql.createPool({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_DATABASE
});

//Controller för att redigera en exiterande aktivitet med patch.

exports.patchTodo = function(req, res)  {
    const { id } = req.params;
    const { todo_task } = req.body;

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
    } else {
        const sqlUpdate = "UPDATE todo SET todo_task = ? WHERE id = ?";
        db.query(sqlUpdate, [todo_task, id], (error, result) => {
            if(error) {
                console.log(error);
                res.sendStatus(500);

            } else 
              {
                res.send(result);
                res.status(200).json('Du har ändrat en aktivitet.');

              }
                
        });
    };

    };


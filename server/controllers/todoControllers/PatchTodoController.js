const mysql = require('mysql2');

const db = mysql.createPool({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_DATABASE
});


// server.patch('/api/update/:id', 

exports.patchTodo = function(req, res)  {
    const { id } = req.params;
    const { todo_task } = req.body;
    const sqlUpdate = "UPDATE todo SET todo_task = ? WHERE id = ?";
    db.query(sqlUpdate, [todo_task, id], (error, result) => {
        if(error) {
            console.log(error);
        } else 
          {
            res.send(result);
          }
            
    });
};

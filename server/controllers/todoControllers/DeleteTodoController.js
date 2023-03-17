const mysql = require('mysql2');

const db = mysql.createPool({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_DATABASE
});


// server.delete('/api/remove/:id', 

exports.deleteTodo = function(req, res) {
    const { id } = req.params;
    const sqlRemove = "DELETE FROM todo WHERE id = ?";
    db.query(sqlRemove, [id], (error, result) => {
        if (error) {
            console.log(error);
        } else {
            res.sendStatus(200);
        }
    });
};

// server.get('/api/get:id', (req, res) => {
//     const { id } = req.params;
//     const sqlGet = "SELECT * FROM todo where id = ?";
//     db.query(sqlGet, [id], (error, result) => {
//         if(error) {
//             console.log(error);
//         }
//         res.send(result);
//     });
// });

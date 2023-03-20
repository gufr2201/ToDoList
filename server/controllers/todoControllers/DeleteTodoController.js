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
    db.query(sqlRemove, [id], (error, result) => {
        if (error) {
            console.log(error);
        } else {
            res.status(200).json('Du har tagit bort en aktivitet');

        }
    });
};


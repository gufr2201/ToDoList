const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const joi = require('joi');
//Här hämtar jag info från .env-filen för att skapa en anslutning till databasen
const db = mysql.createPool({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_DATABASE
});
// Nedan kod ska in i env
// const db = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     password: "superhemligt",
//     database: "todo_list"
// });
//ovan kod är inte säker och ska bort

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));





app.get('/api/get', (req, res) => {
    const sqlGet = "SELECT * FROM todo";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});

app.post('/api/post', (req, res) => {
    const {todo_task} = req.body;
    const sqlInsert = "INSERT INTO todo (todo_task) VALUES (?)";
    db.query(sqlInsert, [todo_task], (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.delete('/api/remove/:id', (req, res) => {
    const { id } = req.params;
    const sqlRemove = "DELETE FROM todo WHERE id = ?";
    db.query(sqlRemove, [id], (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.get('/api/get:id', (req, res) => {
    const { id } = req.params;
    const sqlGet = "SELECT * FROM todo where id = ?";
    db.query(sqlGet, [id], (error, result) => {
        if(error) {
            console.log(error);
        }
        res.send(result);
    });
});

app.patch('/api/update/:id', (req, res) => {
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


// app.post('/', (req, res) => {
//     // const sqlInsert = 
//     // "INSERT INTO todo (todo) VALUES ('clean')";

//     // db.query(sqlInsert, (error, result) => {
//     //     console.log('error', error);
//     //     console.log('result', result)
//     //     res.send('Hello express');
//     // });
// });

app.listen(5000, () => {
    console.log('Server is running on port 5000');
})

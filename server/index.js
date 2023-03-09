const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

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
    })
})

app.post('/', (req, res) => {
    // const sqlInsert = 
    // "INSERT INTO todo (todo) VALUES ('clean')";

    // db.query(sqlInsert, (error, result) => {
    //     console.log('error', error);
    //     console.log('result', result)
    //     res.send('Hello express');
    // });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
})

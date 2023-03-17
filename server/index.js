const express = require('express');
require('dotenv').config();
const server = express();
// const bodyParser = require('body-parser');
const cors = require('cors');
// const mysql = require('mysql2');
// const joi = require('joi');
// const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { AuthenticationRoute } = require('./routes/AuthenticationRoute');
const {TodoRoute} = require('./routes/TodoRoute')
//Här hämtar jag info från .env-filen för att skapa en anslutning till databasen
// const db = mysql.createPool({
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     host: process.env.DATABASE_HOST,
//     database: process.env.DATABASE_DATABASE
// });


server.use(cors({
    origin: 'http://localhost:3000',
    credentials: true}
));
server.use(express.json());
// server.use(bodyParser.urlencoded({extended: true}));
server.use(cookieParser());

server.use('/authentication', AuthenticationRoute);

server.use('/todo', TodoRoute);





server.listen(5000, () => {
    console.log('Server is running on port 5000');
})

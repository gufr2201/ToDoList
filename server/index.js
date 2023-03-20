const express = require('express');
require('dotenv').config();
const server = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { AuthenticationRoute } = require('./routes/AuthenticationRoute');
const {TodoRoute} = require('./routes/TodoRoute')

//I denna fil kör jag servern.
server.use(cors({
    origin: 'http://localhost:3000',
    credentials: true}
));
server.use(express.json());

server.use(cookieParser());

server.use('/authentication', AuthenticationRoute);

server.use('/todo', TodoRoute);





server.listen(5000, () => {
    console.log('Server is running on port 5000');
})

const express = require('express');
const { login } = require('../controllers/LoginController');
const {register} = require('../controllers/RegisterController');
const AuthenticationRoute = express.Router();

AuthenticationRoute.post('/register', register);
AuthenticationRoute.post('/login', login);


exports.AuthenticationRoute = AuthenticationRoute;

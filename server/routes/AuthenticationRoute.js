const express = require('express');
const { login } = require('../controllers/authenticationControllers/LoginController');
const {register} = require('../controllers/authenticationControllers/RegisterController');
const { hashPassword } = require('../middlewares/bcryptMiddleware');
const AuthenticationRoute = express.Router();

//Här har jag skapat en route för alla controllers som styr allt kopplat till att skapa en användare och logga in.

AuthenticationRoute.post('/register', hashPassword, register);
AuthenticationRoute.post('/login', hashPassword, login);


exports.AuthenticationRoute = AuthenticationRoute;

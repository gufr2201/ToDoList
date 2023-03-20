const mysql = require('mysql2');
const joi = require('joi');

const db = mysql.createPool({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_DATABASE
});


//Controller för att registrera en ny användare till att i databasen.

exports.register = function register(req, res) {
    const {username, password} = req.body;
    const sqlInsert = 'INSERT INTO user_info (username, password) VALUES (?, ?)'
    const schema = joi.object({
        username: joi.string().min(4).max(20).required(),
        password: joi.string().min(4).max(20).required(),
    });
    const validation = schema.validate({username: username, password: password});
    if(validation.error) {
     res.status(400).json('Både användarnamn och lösenord måste vara minst fyra tecken långt.') // denna visas ej
    } else {
            db.query(sqlInsert, [username, req.hashedPassword], (error, result) => {
                if (error) {

                         res.sendStatus(500);
                } else 
                {
                  res.status(201).json('Du har registrerat en användare');
                
                }
            
       }
       )}

  
};



const mysql = require('mysql2');
const joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const db = mysql.createPool({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_DATABASE
});

//Controller för att logga in en existerande användare.

exports.login = function (req, res) {
    const {username, password} = req.body;
    const secret = process.env.JWT_SECRET;
    const sqlInsert = 'SELECT * FROM user_info where username = ?';
    const schema = joi.object({
        username: joi.string().min(4).max(20).required(),
        password: joi.string().min(4).max(20).required(),
      });
      const validation = schema.validate({username: username, password: password});
      if (validation.error) {
        console.log(error)
          res.status(401).json('Du har angett fel användarnamn eller lösenord')
      } else
          {
            db.query(sqlInsert, [username], async (error, results) => {
                        if (error) {
                            res.sendStatus(500);
                            return;
                        } 
                            if(results.length > 0) {
                                const match = await bcrypt.compare(password, results[0].password);
                                if(match) {
                                    const authToken = jwt.sign({username}, secret, {expiresIn: 1200000});
                                    res.cookie('authToken', authToken, {
                                        maxAge: 360000000,
                                        sameSite: 'none',
                                        secure: true,
                                        httpOnly: false
                                    }); 
          
            res.status(200).json('Du loggades in');

                                }
                    } 
                
      }

        
    )}
};
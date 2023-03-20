const bcrypt = require('bcrypt')

exports.hashPassword = function hashPassword(req, res, next) {
    const {password} = req.body; 

    bcrypt.hash(password, 10, function(err, hash) {
        if (err) {
            return res.sendStatus(500);
        }
        req.hashedPassword = hash;
        next();
    });
}
  
  
  
  
  
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');


// hash e uma funcao de bcrypt.
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10) // 10 e o "nivel" de encriptacao..
  .then( (hash) => {
    // usamos o modelo de user
    const user = new User({
      email: req.body.email,
      password: hash
    });
    // gravamos para a base de dados
    user.save()
    .then( () => {
      res.status(200).json({
        message: "User added successfully"
      });
    })
    .catch( (error) => {
      res.status(500).json({
        error: error
      });
    });
  })
  .catch( (error) => {
    res.status(500).json({
      error: error
    });
  });
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email})
  .then( (user) => {
    if(!user) {
      return res.status(401).json({
        error: new Error('User not found!')
      });
    }
    bcrypt.compare(req.body.password, user.password)
    .then( (valid) => {
      if(!valid) {
        return res.status(401).json({
          error: new Error('Incorrect password!')
        });
      }
      // Se o user+pass estiverem corretos, criamos token
      const token = jwt.sign(
        {userId: user._id},
        'RANDOM_TOKEN_SECRET',
        {expiresIn: '24h'}
      );
      res.status(200).json({
        userId: user._id,
        token: token
      });
    })
    .catch( (error) => {
      res.status(500).json({
        error: error
      });
    });
  })
  .catch( (error) => {
    res.status(500).json({
      error: error
    });
  });
}

const jwt = require('jsonwebtoken');
const secret = require('./config/keys').secret;

function generateJWT(user){
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    
    return jwt.sign({
      id: user._id,
      email: user.email,
      exp: parseInt(exp.getTime() / 1000),
    }, secret);
  };

  module.exports = generateJWT;
const mongoose = require('mongoose');
const User = mongoose.model('User');
const generateJWT = require('../token');

exports.signin = function(req, res, next){
    const jwtoken = generateJWT(req.user);
    res.cookie('auth', jwtoken); 
    res.send({jwtoken:generateJWT(req.user)});
}

exports.signup = function(req,res,next){
    const {email, password } = req.body;

    if(!email || !password) {
        res.status(422).json({Error:"You must provide email or password"});
    }
    User.findOne({email: email}, function(err, existingUser){
        if(err){return next(err);}

        if(existingUser){
            return res.status(422).json({Error: 'Email is used'});
        }

        User.create({
            email:email,
            password:password
        },(err, user)=>{
            if(err){
                res.status(400).json(err);
            } else{
                const jwtoken = generateJWT(user);
                res.cookie('auth', jwtoken);
                res.status(201).json({jwtoken});    
            }
        });
    }); 
}


const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  googleId: String,
  facebookId: String,
  twitterId: String,
  linkedinId: String,
  githubId: String,
  email: {
    type:String,
    unique:true,
    lowercase:true,
    required:true
  },
  password:String,
  displayName: String,
  name:{
    familyName:String,
    givenName: String
  }
}, {timestamps: true});


userSchema.pre('save',function(next){
  const user = this;
  bcrypt.genSalt(10, function(err, salt){
      if (err){
          return next(err);
      }
      bcrypt.hash(user.password, salt, null, function(err,hash){
          if(err){return next(err)};
          user.password = hash;
          next();
      });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback){
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
      if(err){
          return callback(err);
      }
      callback(null, isMatch);
  })
}

mongoose.model('User', userSchema);
const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  method: {
    type: String,
    enum: ['local', 'google', 'facebook', 'github', 'linkedin'],
    required: true
  },
  local:{
    email: {
      type:String,
      lowercase:true
    },
    password:String,
  },
  google:{
    id: String,
    email: {
      type: String,
      lowercase: true
    },
    displayName: String,
    name:{
      familyName:String,
      givenName: String
    }
  },
  facebook:{
    id: String,
    displayName: String,
    email: {
      type: String,
      lowercase: true
    }
  },
  linkedin:{
    id: String,
    displayName: String,
    email: {
      type: String,
      lowercase: true
    }
  },
  github:{
    id: String,
    displayName: String,
    email: {
      type: String,
      lowercase: true
    }
  }
}, 
{timestamps: true});


userSchema.pre('save', async function(next){
  if(this.method !== 'local'){
    next();
  }
  const user = this;
  await bcrypt.genSalt(10, function(err, salt){
      if (err){
          return next(err);
      }
      bcrypt.hash(user.local.password, salt, null, function(err,hash){
          if(err){return next(err)};
          user.local.password = hash;
          next();
      });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback){
  bcrypt.compare(candidatePassword, this.local.password, function(err, isMatch){
      if(err){
          return callback(err);
      }
      callback(null, isMatch);
  })
}

mongoose.model('User', userSchema);
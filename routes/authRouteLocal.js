const Authentication = require('../controllers/athentication');
const passportService = require('../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session:false});
const requireSingin = passport.authenticate('local',{session:false});

module.exports = app=> {
    app.get('/testauth', requireAuth,function(req,res) {
        res.send({sucess:'auth'});
    });
    app.post('/signin', requireSingin, Authentication.signin);
    app.post('/signup', Authentication.signup);
}
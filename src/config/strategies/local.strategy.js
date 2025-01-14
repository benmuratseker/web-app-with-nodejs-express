const passport = require('passport');
const { Strategy } = require('passport-local');

module.exports = function localStrategy(){
    passport.use(new Strategy({
        usernameField : 'username',
        passwordField : 'password'//the fields on the signUp form on .ejs file
    }, (username, password, done) =>{
        const user = {username, password, 'name': 'Murat'}
        done(null, user);
    }));
}
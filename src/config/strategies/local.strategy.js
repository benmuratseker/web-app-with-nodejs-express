const { MongoClient } = require('mongodb');
const passport = require('passport');
const { Strategy } = require('passport-local');
const debug = require('debug')('app:localStrategy');


const mongoPassword = encodeURIComponent("S8qaze@Y38FFZ*u");

module.exports = function localStrategy(){
    passport.use(
        new Strategy(
            {
                usernameField : 'username',
                passwordField : 'password'//the fields on the signUp form on .ejs file
            },
            (username, password, done) =>{

                const url = `mongodb+srv://dbUser:${mongoPassword}@testcluster.efaao.mongodb.net/?retryWrites=true&w=majority&appName=TestCluster`;

                const dbName = 'globomantics';
                (async function validateUser(){
                    let client;
                    try {
                        client = await MongoClient.connect(url);
                        debug('Connected to the mongo Db');

                        const db = client.db(dbName);
                        const user = await db.collection('users').findOne({username});

                        if (user && user.password === password) {
                            done(null, user);
                        } else {
                            done(null, false);
                        }
                    } catch (error) {
                        done(error, false);
                    }
                    client.close();
                }());

                // const user = { username, password, name: 'Murat' }
                // done(null, user);
            }
        )
    );
}
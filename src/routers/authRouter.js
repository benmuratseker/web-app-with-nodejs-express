const express = require('express');
const debug = require('debug')('app:sessionRouter');
const { MongoClient, ObjectId } = require('mongodb');

const authRouter = express.Router();
const mongoPass = encodeURIComponent("S8qaze@Y38FFZ*u");

authRouter.route('/signUp')
    .post((req, res)=>{
        //res.json(req.body);
        //TODO create user
        const {username, password} = req.body;
        const url = `mongodb+srv://dbUser:${mongoPass}@testcluster.efaao.mongodb.net/?retryWrites=true&w=majority&appName=TestCluster`;
        const dbName = 'globomantics';

        (async function addUser(){
            let client;
            try {
                client = await MongoClient.connect(url);

                const db = client.db(dbName);
                const user = {username, password};
                const results = await db.collection('users').insertOne(user);//await for result not to break user create
                debug(results);

                // req.login(results.ops[0], () => {
                    req.login(results.body[username], () => {
                    debug(res);
                    res.redirect('/auth/profile');//create user and redirect to profile
                });

            } catch (error) {
                debug(error);
            }
            client.close();
        }())


        // req.login(req.body, () => {
        //     res.redirect('/auth/profile');//create user and redirect to profile
        // });
    });

authRouter.route('/profile')
    .get((req, res) => {
        res.json(req.user);//if the user logged in give us the user.
    });

module.exports = authRouter;
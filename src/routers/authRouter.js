const express = require('express');
const debug = require('debug')('app:sessionRouter');
const { MongoClient, ObjectId } = require('mongodb');

const authRouter = express.Router();

authRouter.route('/signUp')
    .post((req, res)=>{
        //res.json(req.body);
        //TODO create user
        req.login(req.body, () => {
            res.redirect('/auth/profile');//create user and redirect to profile
        });
    });

authRouter.route('/profile')
    .get((req, res) => {
        res.json(req.user);//if the user logged in give us the user.
    });

module.exports = authRouter;
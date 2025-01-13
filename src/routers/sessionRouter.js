const express = require('express');
const debug = require('debug')('app:sessionRouter');
const { MongoClient, ObjectId } = require('mongodb');
const sessions = require('../data/sessions.json'); 

const sessionsRouter = express.Router();

const password = encodeURIComponent("S8qaze@Y38FFZ*u");

sessionsRouter.route('/')
    .get((req, res) => {
        //res.send('hello sessions');
        // res.render('sessions', {sessions: [
        //     { title: 'Session 1', description: 'this is session 1'},
        //     { title: 'Session 2', description: 'this is session 2'},
        //     { title: 'Session 3', description: 'this is session 3'},
        //     { title: 'Session 4', description: 'this is session 4'},
        // ]});
    
    const url = `mongodb+srv://dbUser:${password}@testcluster.efaao.mongodb.net/?retryWrites=true&w=majority&appName=TestCluster`;

    const dbName = 'globomantics';//will be created under TestCluster on mongo

    (async function mongo() {
        let client;
        try {
            client = await MongoClient.connect(url);
            debug('Connected to the Mongo Db');

            const db = client.db(dbName);

            const sessions = await db.collection('sessions').find().toArray();
            res.render('sessions', { sessions });
        } catch (error) {
            debug(error.stack);
        }
        client.close();
    }())


        //res.render('sessions', { sessions }); from json file
    });

// sessionsRouter.route('/1')
//     .get((req, res) => {
//         res.send('hello single sessions');
//     })

sessionsRouter.route('/:id')
    .get((req, res) => {
        const id = req.params.id;
        //res.send('hello single sessions ' + id);

        const url = `mongodb+srv://dbUser:${password}@testcluster.efaao.mongodb.net/?retryWrites=true&w=majority&appName=TestCluster`;

        const dbName = 'globomantics';//will be created under TestCluster on mongo

        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url);
                debug('Connected to the Mongo Db');

                const db = client.db(dbName);

                const session = await db.collection('sessions').findOne({_id: new ObjectId(id)});//we have objectid in mongo
                res.render('session', { session })
            } catch (error) {
                debug(error.stack);
            }
            client.close();
        }())

        // res.render('session', { session: sessions[id] }) // from json file
    });

module.exports = sessionsRouter;
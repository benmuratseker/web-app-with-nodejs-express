const express = require('express');
const debug = require('debug')('app:adminRouter');
const { MongoClient } = require('mongodb');
const sessions = require('../data/sessions.json');

const adminRouter = express.Router();

const password = encodeURIComponent("S8qaze@Y38FFZ*u");

adminRouter.route('/').get((req, res) => {
    const url = `mongodb+srv://dbUser:${password}@testcluster.efaao.mongodb.net/?retryWrites=true&w=majority&appName=TestCluster`;

    const dbName = 'globomantics';//will be created under TestCluster on mongo

    (async function mongo() {
        let client;
        try {
            client = await MongoClient.connect(url);
            debug('Connected to the Mongo Db');

            const db = client.db(dbName);

            const response = await db.collection('sessions').insertMany(sessions);
            res.json(response);
        } catch (error) {
            debug(error.stack);
        }
    }())
});

module.exports = adminRouter;
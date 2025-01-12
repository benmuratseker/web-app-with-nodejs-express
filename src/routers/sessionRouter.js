const express = require('express');
const sessions = require('../data/sessions.json'); 

const sessionsRouter = express.Router();

sessionsRouter.route('/')
    .get((req, res) => {
        //res.send('hello sessions');
        // res.render('sessions', {sessions: [
        //     { title: 'Session 1', description: 'this is session 1'},
        //     { title: 'Session 2', description: 'this is session 2'},
        //     { title: 'Session 3', description: 'this is session 3'},
        //     { title: 'Session 4', description: 'this is session 4'},
        // ]});
        res.render('sessions', { sessions });
    });

// sessionsRouter.route('/1')
//     .get((req, res) => {
//         res.send('hello single sessions');
//     })

sessionsRouter.route('/:id')
    .get((req, res) => {
        const id = req.params.id;
        //res.send('hello single sessions ' + id);
        res.render('session', { session: sessions[id] })
    });

module.exports = sessionsRouter;
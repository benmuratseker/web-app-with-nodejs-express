const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const sessions = require('./src/data/sessions.json'); 

const PORT = process.env.PORT || 3000;//get from package.json while hotreload continues to use 3000 after stop and start 4000 becomes active port

const app = express();
const sessionsRouter = express.Router();

// app.use(morgan('combined'));
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));//this definition checks if we have an index page if we don't we see the message belove

//set ejs as a template engine
app.set('views', './src/views');
app.set('view engine', 'ejs');

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
    })

sessionsRouter.route('/1')
    .get((req, res) => {
        res.send('hello single sessions');
    })


app.use('/sessions', sessionsRouter);

app.get('/', (req, res) => {
    //res.send('Hello from my node.js app!');
    res.render('index', { title: " XdLab", data: ['bachata', 'salsa', 'kizomba'] });// to access this page we need to delete such static files index.html 
});

app.listen(PORT, () =>{
    // console.log('listening on port 3000');
    //console.log('listening on port: ' + chalk.green('3000'));
    // console.log(`listening on port: ${chalk.green('3000')}`);
    // debug(`listening on port: ${chalk.green('3000')}`);
    debug(`listening on port: ${chalk.green(PORT)}`);
})
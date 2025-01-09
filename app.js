const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const PORT = process.env.PORT || 3000;//get from package.json while hotreload continues to use 3000 after stop and start 4000 becomes active port

const app = express();

// app.use(morgan('combined'));
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));//this definition checks if we have an index page if we don't we see the message belove

app.get('/', (req, res) => {
    res.send('Hello from my node.js app!');
});

app.listen(3000, () =>{
    // console.log('listening on port 3000');
    //console.log('listening on port: ' + chalk.green('3000'));
    // console.log(`listening on port: ${chalk.green('3000')}`);
    // debug(`listening on port: ${chalk.green('3000')}`);
    debug(`listening on port: ${chalk.green(PORT)}`);
})
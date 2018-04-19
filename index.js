import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import config from './config';
import API from './api';

let app = express();

const mongoDB = 'mongodb://127.0.0.1/pwa_db';
mongoose.connect(mongoDB, {
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB Connection Error'));

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(express.static('app'));
app.use(express.static(__dirname + '/node_modules'));
app.use('/api', API);


const port = config.SERVER.PORT;
app.listen(port, () => console.log(`App is running on port: ${ port }`));
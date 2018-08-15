import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';

// create app and router instances
const app = express();
const router = express.Router();

// set backend port number
const API_PORT = process.env.API_PORT || 3001;

// setup bodyParser middleware and look for JSON data in req
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// setup morgan logger middleware
app.use(logger('dev'));

// setup root route path and init API
router.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

// use our router config when we call /api
app.use('/api', router);

// start server
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import { getSecret } from "./secrets";
import Comment from './models/comment';

// create app and router instances
const app = express();
const router = express.Router();

// set backend port number
const API_PORT = process.env.API_PORT || 3001;

// mongodb config -- URI from secrets.js
mongoose.connect(getSecret('dbUri'), { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

// setup bodyParser middleware and look for JSON data in req
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// setup morgan logger middleware
app.use(logger('dev'));

// setup root route path and init API
router.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

// /api/comments get router to retrieve comment data from db
router.get('/comments', (req, res) => {
  Comment.find((err, comments) => {
    // if error, return error in JSON
    if (err) return res.json({ success: false, error: err });
    // if no error, return comments from mongodb
    return res.json({ success: true, data: comments });
  });
});

// /api/comments post router to add comments to mongodb
router.post('/comments', (req, res) => {
  const comment = new Comment();
  // body parser lets us use req.body
  // this is using object destructuring sugar syntax
  const { author, text } = req.body;
  if (!author || !text) {
    // we should throw an error. we can do this check on the front end
    return res.json({
      success: false,
      error: 'You must provide an author and comment'
    });
  }
  comment.author = author;
  comment.text = text;
  // commit the comment to the db
  comment.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// use our router config when we call /api
app.use('/api', router);

// start server
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// create a new instance of the mongoose.schema
// the schema takes an object that shows the shape of the db entries
const CommentsSchema = new Schema({
  author: String,
  text: String,
}, { timestamps: true });

//export schema for use in server.js
export default mongoose.model('Comment', CommentsSchema);
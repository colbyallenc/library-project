const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const Author = require('../models/author.js');

//datatype that belongs to a group so you have to define it 
const ObjectId = Schema.ObjectId;

const bookSchema = new Schema({
  title: String,
  description: String,
  author: [ { type : Schema.Types.ObjectId, ref: 'Author' } ],
  rating: Number,
  reviews: [ 
    {
      user: String,
      comments: String
    } 
  ]
}, {
  timestamps: {
    createdAt: "createdAt",
    updatedAt: "updatedAt"
  }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
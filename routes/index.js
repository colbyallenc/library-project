const express = require('express');
const router  = express.Router();
const Book = require('../models/book.js');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});


router.get('/books', (req, res, next) => {
  Book.find()
    .then(books => {
      res.render("books", { books });
    })
    .catch(error => {
      console.log(error)
    })
});

router.get('/book/:id', (req, res, next) => {
  let bookId = req.params.id;
  Book.findOne({'_id': bookId})
    .then(book => {
      res.render("book-detail", { book })
    })
    .catch(error => {
      console.log(error)
    })
});


router.get('/books/add', (req, res, next) => {
  res.render("book-add")
});

router.post('/books/add', (req, res, next) => {
  const { title, author, description, rating } = req.body;
  const newBook = new Book({ title, author, description, rating})
  newBook.save()
  .then((book) => {
    res.redirect('/books')
  })
  .catch((error) => {
    console.log(error)
  })
});

router.get('/books/edit', (req, res, next) => {
  Book.findOne({_id: req.query.book_id})
  .then((book) => {
    res.render("book-edit", {book})
  })
  .catch((error) => {
    console.log(error)
  })
});

router.post('/books/edit', (req, res, next) => {
  const { title, author, description, rating } = req.body;
  // Model.update({ query }, { $set : { key: value, key: value }}).then().catch()
  Book.update({_id: req.query.book_id}, { $set: {title, author, description, rating }})
  .then((book) => {
    res.redirect('/books')
  })
  .catch((error) => {
    console.log(error)
  })
});

module.exports = router;

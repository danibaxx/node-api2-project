const express = require('express');
const db = require('../data/db');
const commentsRouter = require('./comments');

const router = express.Router();

// nesting routers within another router
router.use('/:id/comments', commentsRouter);

// GET req
router.get('/', (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(error => {
      res.status(500).json({
        error: 'The posts information could not be retrieved.'
      })
    })
})

// GET req with id
router.get('/:id', (req, res) => {
  const post = req.params.id;

  db.findById(post)
    .then(data => {
      if (data) {
        res.status(200).json(data)
      } else {
        res.status(400).json({
          message: 'The post with the specified ID does not exist.'
        })
      }
    })
    .catch(error => {
      res.status(500).json({
        error: 'The post information could not be retrieved.'
      })
    })
})

// POST req
router.post('/', (req, res) => {
  const posts = req.body;

  if (!posts.title || !posts.contents) {
    return res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.'
    })
  } else {
    db.insert(posts)
      .then(data => {
        res.status(201).json(data)
      })
      .catch(error => {
        res.status(500).json({
          error: 'There was an error while saving the post to the database.'
        })
      })
  }
})

// PUT req
router.put('/:id', (req, res) => {
  const id = req.params.id;

  if(!req.body.title || !req.body.contents) {
    return res.status(400).json({
      message: 'The post with the specified ID does not exist.'
    })
  }

  db.update(id, req.body)
      .then(data => {
        if (data) {
          res.status(200).json(data) 
        } else {
          return res.status(404).json({
            errorMessage: 'Please provide title and contents for the post'
          })
        }
      })
      .catch(error => {
        res.status(500).json({
          error: 'The post information could not be modified.'
        })
      })
})


// DELETE req
router.delete('/:id', (req, res) => {
  db.remove(req.params.id)
    .then(gone => {
      if (gone) {
        res.status(200).json(gone)
      } else {
        res.status(404).json({
          message: 'The post with the specified ID does not exist.'
        })
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'The post could not be removed.'
      })
    })
})

module.exports = router;
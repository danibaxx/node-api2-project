const express = require('express');
const db = require('../data/db');

const router = express.Router({
  mergeParams: true,
})

// has all /comments endpoints
router.get('/', (req, res) => {
  const id = req.params.id;

  db.findPostComments(id)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(error => {
      res.status(500).json({
        error: 'The comments information could not be retrieved.'
      })
    })
})

router.get('/:commentId', (req, res) => {
  db.findCommentById(req.params.id, req.params.commentId)
  .then(data => {
    if (data) {
      res.status(200).json(200)
    } else {
      res.status(400).json({
        message: 'The comment with the specified ID does not exist.'
      })
    }
  })
  .catch(error => {
    res.status(500).json({
      error: 'The comments information could not be retrieved.'
    })
  })
})

// POST req by id w/ comments
router.post('/', (req, res) => {
  const id = req.params.id;
  const newComment = {
    text: req.body.text,
    post_id: req.params.id
  };
  
  if (!req.body.text) {
    res.status(400).json({
      errorMessage: 'Please provide text for comment.'
    })
  }

  db.findById(id)
    .then(data => {
      if (!data) {
        return res.status(404).json({
          message: 'The comment with this ID does not exist.'
        })
      }
    })

  db.insertComment(newComment)
    .then(comment => {
      if (comment) {
        res.status(200).json(comment)
      }
    })
    .catch(error => {
      res.status(500).json({
        error: 'There was an error while saving the comment to the database.'
      })
    })
})

module.exports = router;
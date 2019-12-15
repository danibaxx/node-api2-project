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

// POST req by id w/ comments
// refactor this one!
router.post('/:id', (req, res) => {
  db.findById(req.params.id)
    .then(post => {
      if (post) {
        res.json(post)
      } else if (!post) { 
        res.status(404).json({
          message: 'The post with the specified ID does not exist.'
        })
      } else {
        res.status(400).json({
          errorMessage: 'Please provide text for the comment.'
        })
      }
    })
    .catch(error => {
      res.status(500).json({
        error: 'There was an error while saving the comment to the database.'
      })
    })
})

module.exports = router;
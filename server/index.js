const express = require('express');
const path = require('path')
const dotenv = require('dotenv').config()
const { getReposByUsername } = require('../helpers/github.js')
const { save, top25 } = require('../database/index.js')
let app = express();
let port = process.env.PORT || 1128;

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json())

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(__dirname + '/../client/dist'));
// }

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  const { user } = req.body
  if (!user) {
    res.status(400).json({ msg: 'User does not exist'})
  }

  getReposByUsername(user, (err, repos) => {
    if (err) {
      res.status(400)
      throw new Error('User not found')
    } else {
      save(repos, (err, data) => {
        // console.log(data)
        if (err) {
          res.status(200)
          res.end()
        } else {
          res.status(200).json(data)
        }
      })
    }
  })
});

app.get('/repos', function (req, res) {
  top25((err, data) => {
    if (err) {
      res.status(400)
      throw new Error('Unable to fetch repos')
    } else {
      res.status(200).json(data)
    }
  })
});

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


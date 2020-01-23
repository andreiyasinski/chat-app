const express = require('express');
const router = express.Router();
const { checkUserName } = require('./users')

router.get('/', (req, res) => {
  res.send('server is up and running');
});

router.get('/:name/:room', (req, res) => {
  const { name, room } = req.params;
  const { error } = checkUserName({ name, room });
  res.set('Access-Control-Allow-Origin', '*')
  res.json({ error })
});

module.exports = router;
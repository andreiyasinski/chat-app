const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('server is up and running');
});

// router.get('/:name/:room', (req, res) => {
//   res.send('');
// });

module.exports = router;
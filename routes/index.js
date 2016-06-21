var express = require('express');
var router = express.Router();

router.use('/wiki', require('./wiki'));

router.use('/users', require('./users'));

router.use('/', function (req, res, next) {
  res.redirect('/wiki');
});

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/69', function (req, res, next) {
  res.send({
    name: "test"
  });
});

router.post('/', function (req, res, next) {
  res.send({
    name: "test"
  });
});


module.exports = router;
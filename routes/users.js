var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([{
    id: 1,
    username: "Xsamsepi0l"
  }, {
    id: 2,
    username: "XD0loresH4ze"
  }]);
});

module.exports = router;

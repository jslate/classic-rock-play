var express = require('express');
var router = express.Router();

const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/songs.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the songs database.');
});


/* GET songs listing. */
router.get('/', function(req, res, next) {
  console.log(req.query);
  const artists = req.query.artists.split(',');
  const questionMarks = artists.map(v => '?').join(', ');
  db.all(`select * from songs where artist in (${questionMarks}) and play_count > ? order by release_year`, [...artists, 50], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(JSON.stringify(rows));
  });
});

module.exports = router;

const fs = require('fs');
const parse = require('csv-parse');
const Database = require('sqlite-async');

const dropSongsTable = async (database) => {
  database.run('DROP TABLE IF EXISTS songs');
}
const createSongsTable = async (database) => {
  database.run('CREATE TABLE songs(id integer primary key, name text, artist text, release_year integer, play_count integer)');
}

const populateSongsTable = async(database) => {
  fs.readFile("classic-rock-song-list.csv", "utf8", (err, data) => {
    let currentIndex = 1;
    parse(data, { columns: true }, (error, output) => {
      output.forEach((song) => {
        console.log(currentIndex);
        database.run(`INSERT INTO songs(id, name, artist, release_year, play_count) VALUES(?, ?, ?, ?, ?)`, [currentIndex, song['Song Clean'], song['ARTIST CLEAN'], song['Release Year'], song['PlayCount']], function(err) {
          if (err) {
            return console.log(err.message);
          }
          // console.log(`A row has been inserted with rowid ${this.lastID}`);
        });
        currentIndex++;
      });
    });
  });
}

Database.open('./db/songs.db')
    .then(async (db) => {
        try {
          await dropSongsTable(db);
          await createSongsTable(db);
          await populateSongsTable(db);
        } catch (error) {
          console.log(error);
        }
    })
    .catch(err => {
        console.error(err);
    });

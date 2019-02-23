const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();


fs.stat('./db/songs.db', function (err, stats) {
   console.log(stats);//here we got all information of file in stats variable

   if (err) {
       return console.error(err);
   }

   fs.unlink('./db/songs.db',function(err){
        if(err) return console.log(err);
        console.log('file deleted successfully');
   });
});


new sqlite3.Database('./db/songs.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the songs database.');
});

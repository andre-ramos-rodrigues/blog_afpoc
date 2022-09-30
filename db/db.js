import mysql from "mysql"

export const db = mysql.createConnection({
  host: 'us-cdbr-east-06.cleardb.net',
  user: 'bd71a4d05fd9b2',
  password: "af7adfbe",
  database: "heroku_a2c3e52abb14414"
})

// go to heroku >> resources >> add-ons and add mysql clearDB
// change the db config above inserting the config bellow:
//               user     password            host                            database
// mysql://bd71a4d05fd9b2:af7adfbe@us-cdbr-east-06.cleardb.net/heroku_a2c3e52abb14414?reconnect=true

/*
original db config
export const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: "1181993",
  database: "blog"
})
*/

var connection;

function handleDisconnect() {
  connection = mysql.createConnection(db); // Recreate the connection, since
                                                  // the old one cannot be reused.

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();


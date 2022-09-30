import mysql from "mysql2"

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


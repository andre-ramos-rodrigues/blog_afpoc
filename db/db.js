import mysql from "mysql"

export const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: "1181993",
  database: "blog"
})
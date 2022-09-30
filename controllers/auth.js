import {db} from "../db/db.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const register = (req,res,next) => {
  // check if user already exists
  const q = "SELECT * FROM users WHERE email = ? OR username = ?"

  db.query(q,[req.body.email, req.body.username], (err, data) => {
    if(err) return res.json(err)
    if(data.length) return res.status(409).json("User already exists")

    // hash the password sent in the request and create user
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)

    const q = "INSERT INTO users(`username`, `email`, `password`) VALUES (?)"
    const values = [
      req.body.username, req.body.email, hash
    ]

    db.query(q, [values], (err,data) => {
      if(err) return res.json(err)

      return res.status(200).json("user was created")
    })
  })
}

export const login = (req,res,next) => {
  // check if user exists
  const q = "SELECT * FROM users WHERE username = ?"

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    // check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Wrong username or password!");

    // signing a jwt token that stores the id of the user
    const token = jwt.sign({ id: data[0].iduser }, "jwtkey");

    const { password, ...other } = data[0];

    // setting the token in localstorage
    localStorage.setItem("acess_token", token)

    // setting the token in the cookie
    res
      .cookie("access_token", token)
      .status(200)
      .json(other);
  })
}

export const logout = (req, res) => {
  localStorage.removeItem("acess_token")
  res.clearCookie("access_token").status(200).json("User has been logged out.")
};
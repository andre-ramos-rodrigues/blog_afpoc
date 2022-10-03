import {db} from "../db/db.js"
import jwt from "jsonwebtoken"

// get all posts
export const getPosts = (req,res,next) => {
  // checking if a category was specified
  const q = req.query.cat ? "SELECT * FROM posts WHERE cat = ? ORDER BY idposts DESC" : "SELECT * FROM posts ORDER BY idposts DESC"

  db.query(q, [req.query.cat], (err,data) => {
    if(err) return res.status(500).json(err)
    res.set('Access-Control-Allow-Origin', 'https://brilliant-palmier-9298e8.netlify.app')
    return res.status(200).json(data)
  })
}

//get single post
export const getPost = (req,res,next) => {
  // joining users table with posts table by post uid x user id
  // spacifying img cause both tables have it
  const q = "SELECT p.idposts, `username`, `title`, `desc`, p.img AS pimg, u.img AS uimg, `cat`, `date` FROM users u JOIN posts p ON u.iduser=p.uid WHERE p.idposts = ?"

  db.query(q, [req.params.id], (err,data) => {
    if(err) return res.status(500).json(err)
    
    return res.status(200).json(data[0])
  })
}

// add a new post
export const addPost = (req,res,next) => {
  // check if there is a token

  // using cookies
  //const token = req.cookies.access_token;

  // using localStorage
  const token = req.body.token
  if (!token) return res.status(401).json("Not authenticated!");

  // check if the token is correct
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(402).json("Token is not valid!");

    const q = "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`, `uid`) VALUES (?)"
    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id,
    ]
    db.query(q, [values], (err,data)=>{
      if(err) return res.status(500).json(err)

      return res.status(200).json("post created successfully")
    })
})
}

// delete a single post
export const deletePost = (req,res,next) => {
  // check if there is a token

  // using cookies
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json("Not authenticated!");

  // check if the token is correct
  jwt.verify(token, "jwtkey", (err, user) => {
    if (err) return res.status(402).json("Token is not valid!");

    const postId = req.params.id;
    
    const q = "DELETE FROM posts WHERE `idposts` = ? AND `uid` = ?";

    db.query(q, [postId, user.id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your post!");
      
      return res.json("Post has been deleted!");
    });
  });
};

// update a specific post
export const updatePost = (req, res) => {

  // using cookies
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    //const postId = req.params.id;
    const q =
      "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `idposts` = ? AND `uid` = ?";

    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat, req.body.postId];
    
    db.query(q, [...values, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated.");
    });
  });
};
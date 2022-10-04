import express from "express"
import postRoute from "./routes/posts.js"
import usersRoute from "./routes/users.js"
import authRoute from "./routes/auth.js"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

// resolving json
app.use(express.json())

// resolving cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://brilliant-palmier-9298e8.netlify.app');
  next();
});

// resolving cookies
app.use(cookieParser())

// routers
app.use("/api/posts", postRoute)
app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)

// headers
/*app.all("*", (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://brilliant-palmier-9298e8.netlify.app')
  //res.set('Access-Control-Allow-Origin', 'https://brilliant-palmier-9298e8.netlify.app')
  next();
});*/

// session
/*app.use(session({
  name: "blog_session",
  secret: "778899445566112233",
  resave: false,
  saveUninitialized: true,
  //maxAge: 7200000, // 2 hrs validity
  cookie: {
    path: "/",
    secure: true,
    sameSite: 'none',
    //httpOnly: false
  }
}))
*/

// connection
const PORT = process.env.PORT || 3030
app.listen(PORT, () => {
  console.log("connected!")
})
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
app.use(cors({
  origin: ["https://brilliant-palmier-9298e8.netlify.app"], // the link of my front-end app on Netlify
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))

// resolving cookies
app.use(cookieParser())

// routers
app.use("/api/posts", postRoute)
app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)

// headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://brilliant-palmier-9298e8.netlify.app"); // the link of my front-end app on Netlify
  res.setHeader("Access-Control-Allow-Origin", "https://api.cloudinary.com/v1_1/dmqnk9v0d/auto/upload")
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('content-type', 'application/json');
  next();
});

// connection
const PORT = process.env.PORT || 3030
app.listen(PORT, () => {
  console.log("connected!")
})
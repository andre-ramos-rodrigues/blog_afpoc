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
const origin = "https://brilliant-palmier-9298e8.netlify.app"
app.use(
  cors({
    origin: origin,
    credentials: true,
  })
)

// resolving cookies
app.use(cookieParser())

// routers
app.use("/api/posts", postRoute)
app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)

// connection
const PORT = process.env.PORT || 3030
app.listen(PORT, () => {
  console.log("connected!")
})
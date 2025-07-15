import express from "express";
import shortUrlroute from "./src/routes/short_url_route.js";
import connectDB from "./config/mongodb.config.js";
import dotenv from "dotenv";
import { getAllUrls, redirectToLongUrl, deleteUrl } from "./src/controllers/short_url.controller.js";
import cors from "cors";
import authRoutes from "./src/routes/auth.routes.js";
import cookieParser from "cookie-parser";
import { attachUser } from "./src/middelware/attachUser.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors(
  {
    origin: process.env.ORIGIN,
    credentials: true,
  }
));
app.use(cookieParser());
app.use(attachUser)
app.get("/", (req, res) => {
  res.send("server in running");
});

app.use("/api/create", shortUrlroute);
app.use("/api/auth", authRoutes);
app.get("/:id",redirectToLongUrl)
app.get('/api/urls', getAllUrls)
app.delete('/api/url/delete/:id', deleteUrl)

app.listen(3000, () => {
  connectDB();
  console.log("server is running on PORT 3000");
});

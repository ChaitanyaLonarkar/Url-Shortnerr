import express from "express";
import shortUrlroute from "./src/routes/short_url_route.js";
import connectDB from "./config/mongodb.config.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());



// app.get("/", (req, res) => {
//   res.send("server in running");
// });

app.use("/api/create", shortUrlroute);

app.listen(3000, () => {
  connectDB();
  console.log("server is running on PORT 3000");
});

import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("server in running");
});

app.use("/api/create",)

app.listen(3000, () => {
  console.log("server is running on PORT 3000");
});

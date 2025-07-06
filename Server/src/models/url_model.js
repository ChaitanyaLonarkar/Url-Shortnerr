import mongoose from "mongoose";
const urlSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: true,
    unique: true,
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
  },
  //     user:{
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User",
  //   }
});
const shortUrl = mongoose.model("Url", urlSchema);
export default shortUrl;

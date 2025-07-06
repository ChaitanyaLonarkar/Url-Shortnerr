import shortUrlSchema from "../models/url_model.js";
import { nanoid } from "nanoid";

export const createShortUrl = async (req, res) => {
  try {
    const { longUrl } = req.body;
    // console.log("Received long URL:", longUrl);
    if (!longUrl) {
      return res.status(400).json({ error: "Long URL is required" });
    }

    const shortUrl = nanoid(7); // Generate a unique short URL using nanoid
    console.log("Generated short URL:", shortUrl);
    // Simulate saving to a database
    const newUrl = new shortUrlSchema({
      longUrl,
      shortUrl,
    });
    await newUrl.save(); // Save the new URL to the database

    // await saveShortUrlToDatabase(longUrl, shortUrl);
    res.status(201).json({ shortUrl });
  } catch (error) {
    console.error("Error creating short URL:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const redirectToLongUrl = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Received short URL:", id);

    // Simulate fetching from a database
    const urlEntry = await shortUrlSchema.findOne({ shortUrl: id });

    if (!urlEntry) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    res.redirect(urlEntry.longUrl);

  } catch (error) {
    console.error("Error redirecting to long URL:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }

};

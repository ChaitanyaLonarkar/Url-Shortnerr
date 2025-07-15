import shortUrlSchema from "../models/url_model.js";
import { nanoid } from "nanoid";

export const createShortUrl = async (req, res) => {
  try {
    const data = req.body;
    console.log("Received long URL:", data);
    console.log("user:", req.user);

    var shortUrl;
    if (req.user) {
      shortUrl = await createShortUrlWithUser(
        data.longUrl,
        req.user.id,
        data.customUrl
      );
    } else {
      shortUrl = await createShortUrlWithoutUser(data.longUrl);
    }
    return res.status(201).json({
      shortUrl: shortUrl,
      message: "Short URL created successfully",
    });
  } catch (error) {
    console.error("Error creating short URL:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createShortUrlWithoutUser = async (longUrl) => {
  try {
    // console.log("Received long URL:", longUrl);
    if (!longUrl) {
      return "longUrl is required";
    }

    const shortUrl = nanoid(7); // Generate a unique short URL using nanoid
    // console.log("Generated short URL:", shortUrl);
    // Simulate saving to a database
    const newUrl = new shortUrlSchema({
      longUrl,
      shortUrl,
    });
    await newUrl.save(); // Save the new URL to the database

    // await saveShortUrlToDatabase(longUrl, shortUrl);
    return shortUrl; // Return the generated short URL
  } catch (error) {
    console.error("Error creating short URL:", error);
    return "Error creating short URL:", error.message;
  }
};

export const createShortUrlWithUser = async (
  longUrl,
  userid,
  customUrl = null
) => {
  try {
    console.log("Received long URL:", longUrl, userid, customUrl);
    if (!longUrl) {
      return "longUrl is required";
    }
    if(!customUrl){

      const existingUrl = await shortUrlSchema.findOne({
        longUrl,
      });
      if (existingUrl) {
        return existingUrl.shortUrl;
      }
    }
  

    const shortUrl = customUrl || nanoid(7); // Generate a unique short URL using nanoid
    // console.log("Generated short URL:", shortUrl);
    // Simulate saving to a database
    const newUrl = new shortUrlSchema({
      longUrl,
      shortUrl,
      user: userid, // Save the user ID
    });
    await newUrl.save(); // Save the new URL to the database

    // await saveShortUrlToDatabase(longUrl, shortUrl);
    return shortUrl; // Return the generated short URL
  } catch (error) {
    return "Error creating short URL with user:", error.message;
  }
};

export const redirectToLongUrl = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("Received short URL:", id);

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
export const getAllUrls = async (req, res) => {
  try {
    const urls = await shortUrlSchema.find({ user: req.user.id });
    if (!urls || urls.length === 0) {
      return res.status(404).json({ error: "No URLs found for this user" });
    }
    res.status(200).json({ urls });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteUrl = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Received short URL ID for deletion:", id);

    const deletedUrl = await shortUrlSchema.findOne({
      shortUrl: id,
       // Ensure the user owns the URL
    });

    console.log("Deleted URL:", deletedUrl);

    res.status(200).json({ message: "Short URL deleted successfully" });
  } catch (error) {
    console.error("Error deleting short URL:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
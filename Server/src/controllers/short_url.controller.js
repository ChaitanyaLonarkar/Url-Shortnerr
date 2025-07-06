
export const createShortUrl = async (req, res) => {
    try {
        const { longUrl } = req.body;
        if (!longUrl) {
        return res.status(400).json({ error: "Long URL is required" });
        }
        // Simulate saving to a database


        // await saveShortUrlToDatabase(longUrl, shortUrl);
    
        res.status(201).json({ shortUrl });
    } catch (error) {
        console.error("Error creating short URL:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    }
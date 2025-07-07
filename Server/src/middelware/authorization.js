import jwt from "jsonwebtoken";

export const authorization = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ error: "Unauthorize - no token provided or you need to login" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
      if (!data) {
        return res.status(403).json({
          error: "Unauthorize - invalid token ",
        });
      }
    // Attach user data to the request object
    // req.user = {
    //   id: data.id,
    //   email: data.email,
    // };
    next(); // Call the next middleware or route handler
  
  } catch(error) {
    return res.status(403).json({
      error: error.message || "Unauthorize - invalid token",
    });
  }
};


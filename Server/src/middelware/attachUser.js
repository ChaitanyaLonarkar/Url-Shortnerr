import jwt from "jsonwebtoken";

export const attachUser = (req, res, next) => {
  const token = req.cookies.access_token;
  if(!token) return next()
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
      if (!data) {
        return res.status(403).json({
          error: "Unauthorize - invalid token ",
        });
      }
    //   console.log("User data from token:", data);
    // Attach user data to the request object
    req.user = {
      id: data.id,
      email: data.email,
    };
    next(); // Call the next middleware or route handler
  
  } catch(error) {
    return res.status(403).json({
      error: error.message || "Unauthorize - invalid token",
    });
  }
};

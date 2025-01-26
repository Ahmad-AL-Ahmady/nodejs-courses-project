const jwt = require("jsonwebtoken");
const httpStatusText = require("../utils/httpStatusText");
const appError = require("../utils/appError");

const verifyToken = (req, res, next) => {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];
  if (!authHeader) {
    const error = appError.create(
      "Token is required",
      401,
      httpStatusText.UNAUTHORIZED
    );
    return next(error);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decodedToken:", decodedToken);
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    res.status(401).json({ status: "error", message: "Invaled Token" });
  }
};

module.exports = verifyToken;

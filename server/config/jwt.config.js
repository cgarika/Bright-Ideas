import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const token = req.cookies.userToken; // Retrieve 'usertoken' from cookies

  // Log the token received
  console.log("Received Token:", token);

  if (!token) {
    console.log("No token provided in cookies.");
    return res
      .status(401)
      .json({ error: "Unauthorized action", msg: "No token provided" });
  }

  // Verify the token
  jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
    if (err) {
      console.error("JWT Verification Error:", err.message); // Log the specific error
      return res
        .status(401)
        .json({ error: "Unauthorized action", msg: "Invalid token" });
    }

    console.log("Token verified, payload:", payload); // Log the verified payload
    req.user = payload; // Set req.user to the decoded payload
    next();
  });
};

export default authenticate;

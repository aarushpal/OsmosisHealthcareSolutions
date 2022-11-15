const jwt = require("jsonwebtoken");

// jsonwebtoken is a library that allows us to create and verify tokens

module.exports = async (req, res, next) => {
  try {
    // Get the token from the header
    const token = req.headers["authorization"].split(" ")[1];
    // jwt.verify() verifies the token and returns the payload
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      // if the token is invalid, return an error
      if (err) {
        return res.status(401).send({
          message: "Auth failed",
          success: false,
        });
      }
      // if the token is valid, attach the user id to the request object
      else {
        req.body.userId = decoded.id;
        next();
      }
    });
  } catch (error) {
    // if there is no token, return an error
    return res.status(401).send({
      message: "Auth failed",
      success: false,
    });
  }
};

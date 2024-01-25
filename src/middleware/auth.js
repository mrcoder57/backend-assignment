
import jwt from 'jsonwebtoken'
const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw new Error("No token provided");
    }

    const { userId, isAdmin } = jwt.verify(token, process.env.TOKEN_KEY);

    req.user = {
      ...req.body,
      userId,
    };

    return next();
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export default verifyToken
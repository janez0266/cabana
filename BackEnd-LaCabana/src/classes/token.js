import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export class Token {
  constructor() {}

  static verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Missing authorization header" });
    }
    const token = authHeader;
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      req.userId = decoded.userId;
      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized" });
    }
  }
}

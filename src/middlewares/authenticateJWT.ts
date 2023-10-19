import * as dotenv from "dotenv";
import { Request, Response } from "express";
import { recovered_total_word } from "../services/index_service";

const jwt = require("jsonwebtoken");

dotenv.config();

/* this function checked authentication of token and check if the limit of words used is exceeded else it's show error message */
export default function authenticateJWT(
  req: Request,
  res: Response,
  next: Function
) {
  const authHeader = req.headers.authorization;
  const total_word_used = recovered_total_word(authHeader);

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SIGN_SECRET, (err: any) => {
      if (err) {
        res.sendStatus(403);
      }
      if (total_word_used > 80000) {
        res.sendStatus(402);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
}

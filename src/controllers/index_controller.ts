import { Response, Request} from "express";
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

export default async function getToken(req: Request, res: Response) {
  const login = req.body;
  
  if ( login.email === "foo@bar.com") {
    const acces_token = jwt.sign(
      { 
        email: login.email
      },
      process.env.JWT_SIGN_SECRET,
      {
        expiresIn: '24h',
      },
    );
    res.json({ accesToken: acces_token });
  }
}

import * as dotenv from "dotenv";
import { updatecountword } from "../services/index_service";
import { Response, Request } from "express";
const jwt = require("jsonwebtoken");

dotenv.config();

/**
 * The function getToken generates a JWT access token if the provided email is "foo@bar.com".
 * @param {Request} req - The `req` parameter represents the incoming request object, which contains
 * information about the HTTP request made by the client. It includes properties such as headers, body,
 * query parameters, and more.
 * @param {Response} res - The `res` parameter is the response object that is used to send a response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as `json()` which is used to send a JSON response.
 */
export async function getToken(req: Request, res: Response) {
  const login = req.body;
  const count_word = 0;
  const acces_token = jwt.sign(
    {
      email: login.email,
      total_word: count_word,
    },
    process.env.JWT_SIGN_SECRET,
    {
      expiresIn: "24h",
    }
  );
  res.json({ accesToken: acces_token });
}

/**
 * The `justifyText` function takes in a request and response object, splits the content into words,
 * and justifies the text by adding spaces between words to make each line 80 characters long.
 */
export function justifyText(req: Request, res: Response) {
  let tokenUpdate = req.headers.authorization;
  const content = req.body;
  let words = content.split(" ");
  let lines = [];
  let current_line: string[] = [];
  let current_length: number = 0;

  for (const word of words) {
    if (current_length + word.length + current_line.length > 80) {
      lines.push(current_line);
      current_line = [];
      current_length = 0;
    }
    current_line.push(word);
    current_length += word.length;
  }
  lines.push(current_line);

  let justify_text: string[] = [];
  for (const line of lines) {
    const total_space = 80 - line.reduce((acc, word) => acc + word.length, 0);

    if (line.length > 1) {
      const space_word = Math.floor(total_space / (line.length - 1));
      const space_additional = Math.floor(total_space % (line.length - 1));
      let justify_line = "";
      for (let i = 0; i < line.length; i++) {
        justify_line += line[i];
        if (i < line.length - 1) {
          justify_line += " ".repeat(space_word);
          if (i < space_additional) {
            justify_line += " ";
          }
        }
      }
      justify_text.push(justify_line);
    } else {
      justify_text.push(line[0].padEnd(80));
    }
  }
  /** this code uses the "updatecountword" function which updates the number of words used in the jwt token */
  const updateToken = updatecountword(tokenUpdate, words.length);
  res.send(justify_text.join("\n"));
}

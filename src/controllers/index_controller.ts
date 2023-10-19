import { Response, Request} from "express";
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

export async function getToken(req: Request, res: Response) {
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


export function justifyText(req: Request, res: Response) {
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
      let justify_line = '';
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

  res.send(justify_text.join("\n"));
}
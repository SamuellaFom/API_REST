import * as dotenv from "dotenv";
const jwt = require("jsonwebtoken");

dotenv.config();

/**
 * The function `recovered_total_word` takes a token as input, splits it to extract the second part,
 * decodes it using a secret key, and returns the value of the `total_word` property from the decoded
 * token.
 */
export function recovered_total_word(token: any) {
  const split_token = token.split(" ")[1];
  const decoded_token = jwt.verify(split_token, process.env.JWT_SIGN_SECRET);
  return decoded_token.total_word;
}

/**
 * The function `updatecountword` takes a token and a count of words as input, decodes the token,
 * updates the total word count in the decoded token, and then re-encodes the token.
 * @param {any} token - The `token` parameter is a string that represents a JSON Web Token (JWT). It is
 * used for authentication and authorization purposes.
 * @param {number} count_word - The `count_word` parameter is the number of words that you want to add
 * to the `total_word` property of the decoded token.
 */
export function updatecountword(token: any, count_word: number) {
  const split_token = token.split(" ")[1];
  const decoded_token = jwt.verify(split_token, process.env.JWT_SIGN_SECRET);

  decoded_token.total_word += count_word;
  const acces_token = jwt.sign(decoded_token, process.env.JWT_SIGN_SECRET);
}

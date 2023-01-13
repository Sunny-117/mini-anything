import { randomNum } from "./tool1.js";
import { printTxt } from "./tool2.js";

export function say(name) {
  const num = randomNum(1, 100);
  printTxt(num);
  return `hello ${name}`;
}

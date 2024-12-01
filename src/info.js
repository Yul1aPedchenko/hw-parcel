import { users, protoUser } from "./users.js";
export function userObj(name, email, text) {
  const newUser = Object.create(protoUser);
  newUser.name = name;
  newUser.email = email;
  newUser.text = text;
  return users.push(newUser);
}

module.exports = userObj;
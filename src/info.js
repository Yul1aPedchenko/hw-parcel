const users = [];
const protoUser = {
  name: "Your name",
  email: "your email",
  text: "text message",
};
export function userObj(name, email, text) {
  const newUser = Object.create(protoUser);
  newUser.name = name;
  newUser.email = email;
  newUser.text = text;
  return users.push(newUser);
}

export { users, protoUser };

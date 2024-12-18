import { users, protoUser } from "./info.js";
import { userObj } from "./info.js";
document.getElementById("button").addEventListener("click", (e) => {
  e.preventDefault();
  const name = document.querySelector("#inputName").value;
  const email = document.querySelector("#inputMail").value;
  const text = document.querySelector("#inputText").value;
  if (name !== "" && email !== "") {
    if (email.includes("@gmail.com")) {
      userObj(name, email, text);
      alert(`Hi, ${name}. Your registration are succesful!`);
      console.log(users);
    } else {
        alert("check if you have spelt your email correctly");
    }
  } else {
    alert("Please, fill in all the fields of the form (message is optional)");
  }
});

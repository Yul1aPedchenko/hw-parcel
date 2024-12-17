import students from "../students.json" assert { type: "json" };
import * as main from "./index.js";
const filtereData = (query) => {
  const filteredUsers = students.filter((student) =>
    student.lastName.toLowerCase().includes(query.toLowerCase())
  );
  main.updateStudentList(filteredUsers);
};

document.getElementById("search").addEventListener("input", (event) => {
  filtereData(event.target.value);
});

const filtredDataByBtn = (course) => {
  const filteredUsersA = students.filter((student) => {
    return student.courseNumber == course;
  });
  main.updateStudentList(filteredUsersA);
};
document.querySelectorAll(".search-btn").forEach((button) => {
  button.addEventListener("click", (event) => {
    const course = event.target.getAttribute("data-course");

    filtredDataByBtn(course);
  });
});

document.querySelector(".reset-btn").addEventListener("click", () => {
  main.updateStudentList(students); 
});
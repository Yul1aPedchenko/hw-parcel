import students from "../students.json";
import univerData from "../uni_data.json";
import * as main from './index.js';
import * as load from "./load.js";

function addNewStudent(
  firstName,
  lastName,
  age,
  courseNumber,
  faculty,
  courses,
  id
) {
  const newStudent = {
    firstName,
    lastName,
    age,
    courseNumber,
    faculty,
    courses,
    id,
  };

  students.push(newStudent);
  main.updateStudentList();
}
document.getElementById("addStudent").addEventListener("click", (event) => {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const age = document.getElementById("age").value;
  const courseNumber = document.getElementById("courseNumber").value;
  const faculty = document.getElementById("faculties").value;
  const id = students.length;
  const selectedCourses = Array.from(
    document.querySelectorAll("#courseList input:checked")
  ).map((checkbox) => checkbox.value);
    const curFaculty = univerData.find((data) => data.id == faculty).faculty;
  if (
    firstName &&
    lastName &&
    age &&
    courseNumber &&
    selectedCourses.length > 0
  ) {
    addNewStudent(
      firstName,
      lastName,
      age,
      courseNumber,
      curFaculty,
      selectedCourses,
      id
    );

    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("age").value = "";
    document.getElementById("courseNumber").value = "";
    document.getElementById("faculties").value = univerData[0].id;
    document.querySelector("#courseList").innerHTML = load.createCourses(
      univerData,
      univerData[0].id
    );
  } else {
    alert("Please fill out all fields and select at least one course.");
  }
});

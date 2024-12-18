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
) {
  const newStudent = {
    firstName,
    lastName,
    age: parseInt(age),
    courseNumber: parseInt(courseNumber),
    faculty,
    courses,
    id: Date.now(),
  };

  students.push(newStudent); 
  main.updateStudentList(); 
}
document.getElementById("addStudent").addEventListener("click", (event) => {
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const age = document.getElementById("age").value.trim();
  const courseNumber = document.getElementById("courseNumber").value.trim();
  const faculty = document.getElementById("faculties").value;
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
      students.length
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
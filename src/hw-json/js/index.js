import students from "../students.json";
import univerData from "../uni_data.json";
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
    id
  };

  students.push(newStudent);
  updateStudentList();
}
document.getElementById("addStudent").addEventListener("click", (event) => {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const age = document.getElementById("age").value;
  const courseNumber = document.getElementById("courseNumber").value;
  const faculty = document.getElementById("faculties").value;
  const id = students.length() 
  const selectedCourses = Array.from(
    document.querySelectorAll("#course-list input:checked")
  ).map((checkbox) => checkbox.value);

  if (
    firstName &&
    lastName &&
    age &&
    courseNumber &&
    faculty &&
    selectedCourses.length > 0
  ) {
    addNewStudent(
      firstName,
      lastName,
      age,
      courseNumber,
      faculty,
      selectedCourses,
      id
    );

    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("age").value = "";
    document.getElementById("courseNumber").value = "";
    document.getElementById("faculties").value = univerData[0].id;
    document.querySelector("#course-list").innerHTML = createCourses(
      univerData,
      univerData[0].id
    );
  } else {
    alert("Please fill out all fields and select at least one course.");
  }
});


function deleteStudent(studentId) {
  const studentIndex = students.findIndex(
    (student) => student.id === studentId
  );
  if (studentIndex !== -1) {
    students.splice(studentIndex, 1);
    updateStudentList();
  }
}

function renderStudents(students) {
  return students
    .map(
      (student) => `<div class="student" id="${student.id}">
      <div class="student-prewrap">
        <h2 class="student-name">${student.firstName} ${student.lastName}</h2>
        <div class="student-wrap">
          <p class="student-age">${student.age} years</p>
          <p class="student-number">${student.courseNumber} course</p>
        </div>
        <span class="student-faculty">${student.faculty}</span>
        <ul class="student-courses">
          ${student.courses
            .map((course) => `<li class="student-course">${course}</li>`)
            .join("")}
        </ul>
        </div>
        <span class="mini-modal">
          <button class="btn-delete" data-id="${student.id}">Delete</button>
          <button class="btn-change">Change</button>
        </span>
      </div>`
    )
    .join("");
}

function updateStudentList() {
  document.querySelector(".students-list").innerHTML = renderStudents(students);
  addDeleteEventListeners();
}

function addDeleteEventListeners() {
  const deleteButtons = document.querySelectorAll(".btn-delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const studentId = parseInt(event.target.getAttribute("data-id"));
      deleteStudent(studentId);
    });
  });
}

document.querySelector(".students-list").innerHTML = renderStudents(students);
addDeleteEventListeners();

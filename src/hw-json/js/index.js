import students from "../students.json";
import univerData from "../uni_data.json";
import * as load from "./load.js";
// import * as change from './change.js';
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
  updateStudentList();
}
document.getElementById("addStudent").addEventListener("click", (event) => {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const age = document.getElementById("age").value;
  const courseNumber = document.getElementById("courseNumber").value;
  const faculty = document.getElementById("faculties").value;
  const id = students.length;
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
          <button class="btn-change" data-id="${student.id}">Change</button>
        </span>
      </div>`
    )
    .join("");
}

function updateStudentList() {
  document.querySelector(".students-list").innerHTML = renderStudents(students);
  addDeleteEventListeners();
  addChangeEventListeners();
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

addChangeEventListeners();
document.querySelector(".students-list").innerHTML = renderStudents(students);
addDeleteEventListeners();

function addChangeEventListeners() {
  const changeButtons = document.querySelectorAll(".btn-change");
  changeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const studentId = parseInt(event.target.getAttribute("data-id"));
      toggleModal();
      fullModal(studentId);
      document
        .getElementById("changeInfoBtn")
        .addEventListener("click", (e) => {
          e.preventDefault();
          changeStudent(studentId);
        });
    });
  });
}
const firstNameEl = document.getElementById("changedFirstName");
const lastNameEl = document.getElementById("changedLastName");
const ageEl = document.getElementById("changedAge");
const courseNumberEl = document.getElementById("changedCourseNumber");
function fullModal(studentId) {
  const student = students.find((student) => student.id == studentId);
  if (!student) return;

  firstNameEl.value = student.firstName || "";
  lastNameEl.value = student.lastName || "";
  ageEl.value = student.age || "";
  courseNumberEl.value = student.courseNumber || "";
}

function changeStudent(studentId) {
  const student = students.find((student) => student.id == studentId);
  if (!student) return;

  student.firstName = firstNameEl.value || student.firstName;
  student.lastName = lastNameEl.value || student.lastName;
  student.age = ageEl.value || student.age;
  student.courseNumber = courseNumberEl.value || student.courseNumber;

  toggleModal();
  updateStudentList();
}

const modal = document.querySelector("[header-modal]");
function toggleModal() {
  modal.classList.toggle("is-hidden");
}

addChangeEventListeners();

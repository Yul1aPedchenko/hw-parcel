import students from "../students.json";
import univerData from "../uni_data.json";
import * as main from "./index.js";
import * as load from "./load.js";
export function addChangeEventListeners() {
  const changeButtons = document.querySelectorAll(".btn-change");
  changeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const studentId = parseInt(event.target.getAttribute("data-id"));
      toggleModal();
      fullModal(studentId);
      const changeInfoBtn = document.getElementById("changeInfoBtn");
      const newHandler = (e) => {
        e.preventDefault();
        changeStudent(studentId);
        changeInfoBtn.removeEventListener("click", newHandler);
      };

      changeInfoBtn.addEventListener("click", newHandler);
    });
  });
}
const firstNameEl = document.getElementById("changedFirstName");
const lastNameEl = document.getElementById("changedLastName");
const ageEl = document.getElementById("changedAge");
const courseNumberEl = document.getElementById("changedCourseNumber");
const facultyEl = document.getElementById("changedFaculties");
const coursesEl = Array.from(
  document.querySelectorAll("#changedCourseList input:checked")
).map((checkbox) => checkbox.value);


function fullModal(takeStudentId) {
  const student = students.find((student) => student.id == takeStudentId);
  if (!student) return;

  const facultyId = univerData.find(
    (data) => data.faculty == student.faculty
  )?.id;

  firstNameEl.value = student.firstName || "";
  lastNameEl.value = student.lastName || "";
  ageEl.value = student.age || "";
  courseNumberEl.value = student.courseNumber || "";
  facultyEl.value = facultyId || "";

  createInfoForChangedForm(takeStudentId);
}

function changeStudent(studentId) {
  const student = students.find((student) => student.id == studentId);
  if (!student) return;

  student.firstName = firstNameEl.value || student.firstName;
  student.lastName = lastNameEl.value || student.lastName;
  student.age = parseInt(ageEl.value) || student.age;
  student.courseNumber = parseInt(courseNumberEl.value) || student.courseNumber;

  const facultySelect = document.querySelector("#changedFaculties");
  const selectedFaculty = univerData.find(
    (data) => data.id == parseInt(facultySelect.value)
  );
  if (selectedFaculty) {
    student.faculty = selectedFaculty.faculty;
  }

  const selectedCourses = Array.from(
    document.querySelectorAll("#changedCourseList input:checked")
  ).map((checkbox) => checkbox.value);
  student.courses = selectedCourses;

  toggleModal();
  main.updateStudentList();
}

const modal = document.querySelector("[header-modal]");
function toggleModal() {
  modal.classList.toggle("is-hidden");
}

addChangeEventListeners();

function createInfoForChangedForm(curStudentId) {
  const curStudent = students.find((student) => student.id === curStudentId);

  const changedFacultiesEl = document.querySelector("#changedFaculties");
  const changedFirstFacultyId = univerData.find(
    (data) => data.faculty == curStudent.faculty
  );

  changedFacultiesEl.innerHTML = load.createFaculties(univerData);
  changedFacultiesEl.value = changedFirstFacultyId.id;

  const changedCourseListEl = document.querySelector("#changedCourseList");
  changedCourseListEl.innerHTML = load.createCourses(
    univerData,
    changedFirstFacultyId.id,
    curStudent.courses
  );

  changedFacultiesEl.addEventListener("change", (event) => {
    const facultyId = event.target.value;
    changedCourseListEl.innerHTML = load.createCourses(
      univerData,
      facultyId,
      curStudent.courses
    );
  });
}

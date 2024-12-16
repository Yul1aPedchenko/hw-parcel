import students from "../students.json";
import * as main from './index.js';
export function addChangeEventListeners() {
  const changeButtons = document.querySelectorAll(".btn-change");
  changeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const studentId = parseInt(event.target.getAttribute("data-id"));
      toggleModal();
      fullModal(studentId);
      document.getElementById("changeInfoBtn").onclick = () =>
        changeStudent(studentId);

    });
  });
}
const firstNameEl = document.getElementById("changedFirstName");
const lastNameEl = document.getElementById("changedLastName");
const ageEl = document.getElementById("changedAge");
const courseNumberEl = document.getElementById("changedCourseNumber");
export function fullModal(studentId) {
  const student = students.find((student) => student.id == studentId);
  firstNameEl.value = `${student.firstName}`;
  lastNameEl.value = `${student.lastName}`;
  ageEl.value = `${student.age}`;
  courseNumberEl.value = `${student.courseNumber}`;
}
export function changeStudent(studentId) {
    const student = students.find((student) => student.id == studentId);
    student.firstName = firstNameEl.value || student.firstName;
    student.lastName = lastNameEl.value || student.lastName;
    student.age = ageEl.value || student.age;
    student.courseNumber = courseNumberEl.value || student.courseNumber;
    main.updateStudentList();
}
export const modal = document.querySelector("[header-modal]");
export function toggleModal() {
  modal.classList.toggle("is-hidden");
}
addChangeEventListeners();

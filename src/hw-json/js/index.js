import students from "../students.json" ;
import univerData from "../uni_data.json" ;
import * as load from "./load.js";
import * as change from './change.js';
import * as search from './search.js';
import add from './add.js';
import * as deleteStud from './delete.js';

export function renderStudents(students) {
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

export function updateStudentList(filteredStudents = students) {
  document.querySelector(".students-list").innerHTML =
    renderStudents(filteredStudents);
  deleteStud.addDeleteEventListeners();
  change.addChangeEventListeners();
}



document.querySelector(".students-list").innerHTML = renderStudents(students);
change.addChangeEventListeners();
deleteStud.addDeleteEventListeners();
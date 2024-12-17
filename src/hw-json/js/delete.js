import students from "../students.json";
import univerData from "../uni_data.json";
import * as main from "./index.js";
import * as load from "./load.js";

function deleteStudent(studentId) {
  const studentIndex = students.findIndex(
    (student) => student.id === studentId
  );
  if (studentIndex !== -1) {
    students.splice(studentIndex, 1);
    main.updateStudentList();
  }
}

export function addDeleteEventListeners() {
  const deleteButtons = document.querySelectorAll(".btn-delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const studentId = parseInt(event.target.getAttribute("data-id"));
      deleteStudent(studentId);
    });
  });
}
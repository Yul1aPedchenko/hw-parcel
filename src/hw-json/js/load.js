import univerData from '../uni_data.json';

export function createFaculties(faculties) {
  return faculties
    .map(
      (faculty) => `<option value="${faculty.id}">${faculty.faculty}</option>`
    )
    .join("");
}
document.querySelector("#faculties").innerHTML = createFaculties(univerData);

function createCourses(allData, facultyId) {
  const currentData = allData.find((data) => data.id === parseInt(facultyId));
  if (currentData) {
    return currentData.courses
      .map(
        (course) =>
          `<label> <input type="checkbox" value="${course}"/>${course} </label>`
      )
      .join("");
  }
}
const firstFacultyId = univerData[0].id;
document.querySelector("#faculties").value = firstFacultyId;
document.querySelector("#course-list").innerHTML = createCourses(
  univerData,
  firstFacultyId
);
document.querySelector("#faculties").addEventListener("change", (event) => {
  const facultyId = event.target.value;
  const coursesContainer = document.querySelector("#course-list");
  coursesContainer.innerHTML = createCourses(univerData, facultyId);
});
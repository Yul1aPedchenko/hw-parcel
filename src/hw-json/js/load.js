import univerData from "../uni_data.json";
import students from "../students.json";
export function createFaculties(faculties) {
  return faculties
    .map(
      (faculty) => `<option value="${faculty.id}">${faculty.faculty}</option>`
    )
    .join("");
}
document.querySelector("#faculties").innerHTML = createFaculties(univerData);

export function createCourses(allData, facultyId, selectedCourses = []) {
  const currentData = allData.find((data) => data.id === parseInt(facultyId));
  if (currentData) {
    return currentData.courses
      .map((course) => {
        const isChecked = selectedCourses.includes(course) ? "checked" : "";
        return `<label class="lable-course">
                  <input type="checkbox" value="${course}" ${isChecked}/>
                  ${course}
                </label>`;
      })
      .join("");
  }
  return "";
}

const firstFacultyId = univerData[0].id;
document.querySelector("#faculties").value = firstFacultyId;
document.querySelector("#courseList").innerHTML = createCourses(
  univerData,
  firstFacultyId
);
document.querySelector("#faculties").addEventListener("change", (event) => {
  const facultyId = event.target.value;
  const coursesContainer = document.querySelector("#courseList");
  coursesContainer.innerHTML = createCourses(univerData, facultyId);
});

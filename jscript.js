let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const tabBtn = document.getElementById("tab-btn");

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

function render(leads) {
  let listItems = "";
  for (i = 0; i < leads.length; i++) {
    listItems += `
      <li>
        <a target='_blank' href='${"https:" + leads[i]}'>
        ${leads[i]}
      </a>
      </li>`;
  }
  ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});



// ZADANIE NR 2

// function addNewStudent(name, surname, insNumb, fieldOfStudies, notes) {
//   let randomId = Math.floor(Math.random() * 999) + 1;
//   let newStudent = {
//     id: randomId,
//     name: name,
//     surname: surname,
//     insuranceNumber: insNumb,
//     fieldOfStudies: fieldOfStudies,
//     notes: notes,
//   };
//   students.push(newStudent);
//   return students;
// }
// console.log(addNewStudent("Maciej", "Kamiński", "86080102155", "Programing", [5, 6, 5, 4, 5]));

// ZADANIE 3

// students.map((allStudents) => {
//   const index = students.indexOf(allStudents);
//   const studentCount = index + 1;
//   console.log(
//     `Student ${studentCount}: ${allStudents.name} ${allStudents.surname}, Insurance Number: ${allStudents.insuranceNumber}, Field of study: ${allStudents.fieldOfStudies}`
//   );
//   return students;
// });

// ZADANIE NR 4

// function getMaxNote(studentsNames, incNumb) {
//   const maxNote = students.map(studentsNames, incNumb);

//   return `Max note for ${studentsNames.name} ${studentsNames.surnname} is ${incNumb.maxNote}`;
// }
// console.log(getMaxNote(students));

// const longestString = (array) => {
//   let longestWord = "";
//   array.forEach((word) => {
//     if (word.length > longestWord.length) {
//       longestWord = word;
//     }
//   });
//   return longestWord;
// };

// const max = Math.max(...students.notes);

// console.log(max);

// const max = Math.max(...students[0].notes);
// console.log(max);

// ////////////////// Zadanie 4 //////////////////

function compareNr(a, b) {
  return a - b;
}

function getMaxNote([], studentInsuranceNumber) {
  for (const key in students) {
    let sortedNotes = students[key].notes.sort(compareNr);
    let studentMaxNote = sortedNotes[sortedNotes.length - 1];
    if (students[key].insuranceNumber === studentInsuranceNumber) {
      console.log("Max note for student " + students[key].name + " " + students[key].surname + " is " + studentMaxNote);
    }
  }
}
getMaxNote(students, "987654321");

function getMinNote([], studentInsuranceNumber) {
  for (const key in students) {
    let sortedNotes = students[key].notes.sort(compareNr);
    let studentMinNote = sortedNotes[0];
    if (students[key].insuranceNumber === studentInsuranceNumber) {
      console.log("Min note for student " + students[key].name + " " + students[key].surname + " is " + studentMinNote);
    }
  }
}
getMinNote(students, "987654321");

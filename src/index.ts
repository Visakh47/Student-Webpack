var students = [];
import '../style.css';
import './indexedDatabase.js';
import { IndexedDBManager } from './indexedDatabase.js';

// let db;

// const dbName = "studentDatabase";

// const request = indexedDB.open(dbName, 1);

// request.onsuccess = function(event) {
//     db = request.result;
//     console.log("Connected to DB");
//     retreiveData();
// }

// request.onerror = (event) => {
//   // Handle errors.
// };
// request.onupgradeneeded = (event) => {
//   db = event.target.result;
//   //object store is analogues to a table
//   const studentTable = db.createObjectStore("studentDetails", { keyPath: "id" , autoIncrement: true});

//   //create
//   studentTable.createIndex("universityId","universityId", {unique: true});
//   studentTable.createIndex("name", "name", { unique: false });
// };

let dbManager;

async function addStudent(e) {
  
    const studentUniversityId = document.querySelector("#student-universityId");
    const studentName = document.querySelector("#student-name");
    const studentAge = document.querySelector("#student-age");
    const studentClass = document.querySelector("#student-class");
    const studentAddress = document.querySelector("#student-address");
    const student = {universityId: studentUniversityId.value,  name: studentName.value, age: studentAge.value, class: studentClass.value, address: studentAddress.value};

    e.preventDefault();

    await dbManager.add(student);
    addStudentModalClose();
    retreiveData();
  }


const Addmodal = document.querySelector("#addStudentModal");
const Editmodal = document.querySelector("#editStudentModal");
const overlay = document.querySelector(".overlay");
const addStudentModalBtn = document.querySelector("#CreateStudent");
const closeStudentModalBtn = document.querySelector("#cancelAddStudentBtn")
const addStudentConfirm = document.querySelector("#addStudentBtn");

const closeEditStudentModalBtn = document.querySelector("#cancelEditStudentBtn")
const editStudentConfirm = document.querySelector("#editStudentBtn");

addStudentModalBtn.addEventListener(
    "click", addStudentModalOpen
);

closeStudentModalBtn.addEventListener(
    "click", addStudentModalClose
);

closeEditStudentModalBtn.addEventListener(
    "click", editStudentModalClose
);



addStudentConfirm.addEventListener("click", addStudent);

function addStudentModalOpen() {
    Addmodal.classList.remove("hidden");
    Addmodal.classList.add("overlay");
}

function addStudentModalClose() {
    Addmodal.classList.add("hidden");
    Addmodal.classList.remove("overlay");
}

function editStudentModalOpen() {
    Editmodal.classList.remove("hidden");
    Editmodal.classList.add("overlay");
}

function editStudentModalClose() {
    Editmodal.classList.add("hidden");
    Editmodal.classList.remove("overlay")
}



  function createStudentRow(student) {
    const row = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.id = 'studentName';
    nameCell.textContent = student.name;
  
    const ageCell = document.createElement('td');
    ageCell.textContent = student.age;
  
    const classCell = document.createElement('td');
    classCell.textContent = student.class;

    const addressCell = document.createElement('td');
    addressCell.textContent = student.address;
  
    const universityIdCell = document.createElement('td');
    universityIdCell.textContent = student.universityId;
  
    const actionsCell = document.createElement('td');
    actionsCell.id = "studentActions"
    const editButton = document.createElement('button');
    editButton.id = 'EditButton';
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editStudent(student));
  
    const deleteButton = document.createElement('button');
    deleteButton.id = 'DeleteButton'
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteStudent(student));
   
  
    actionsCell.appendChild(editButton);
    actionsCell.appendChild(deleteButton);
  
    row.appendChild(universityIdCell);
    row.appendChild(nameCell);
    row.appendChild(ageCell);
    row.appendChild(classCell);
    row.appendChild(addressCell);
    row.appendChild(actionsCell);
  
    return row;
  }
  
 async function retreiveData() {
    students = await dbManager.getAll();
    renderTable();
  }
  

  function renderTable() {
    const tableBody = document.querySelector('#student-table tbody');
    tableBody.innerHTML = '';
    students.forEach((student) => {
      const row = createStudentRow(student);
      tableBody.appendChild(row);
    });
  }


var Editedstudent;

async function editStudent(student) {
    const studentUniversityId = document.querySelector("#Estudent-universityId");
    const studentName = document.querySelector("#Estudent-name");
    const studentAge = document.querySelector("#Estudent-age");
    const studentClass = document.querySelector("#Estudent-class");
    const studentAddress = document.querySelector("#Estudent-address");

    console.log(`Editing student ${student.name}: ${student.id}`);

    student = await dbManager.getById(student.id);
    if(student) {
      //assigning values to modal
      console.log(student);
      studentUniversityId.value = student.universityId;
      studentName.value = student.name ;
      studentAge.value = student.age;
      studentClass.value = student.class;
      studentAddress.value = student.address;
      Editedstudent = student;
      editStudentModalOpen();
    }
  }
  

  editStudentConfirm.addEventListener(
    "click", async () => {
        const studentUniversityId = document.querySelector("#Estudent-universityId");
        const studentName = document.querySelector("#Estudent-name");
        const studentAge = document.querySelector("#Estudent-age");
        const studentClass = document.querySelector("#Estudent-class");
        const studentAddress = document.querySelector("#Estudent-address");
  
        Editedstudent.name = studentName.value;
        Editedstudent.age = studentAge.value;
        Editedstudent.class = studentClass.value;
        Editedstudent.universityId = studentUniversityId.value;
        Editedstudent.address = studentAddress.value;
        
        console.log(Editedstudent);
        await dbManager.edit(Editedstudent);
        console.log('Student updated successfully');
        editStudentModalClose();
        retreiveData();
    }
  );
  
  function deleteStudent(student) {
    console.log(`Deleting student: ${student.name}`);
    dbManager.deleteById(student.id);
    retreiveData();
  }
  

 

  window.addEventListener('load', async () => {
    dbManager = new IndexedDBManager("studentDatabase",1);
    await dbManager.dbPromise;

    console.log(dbManager.db);
    students = await retreiveData();
  })
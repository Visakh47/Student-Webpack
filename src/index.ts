import '../style.css';
import './indexedDatabase.js';
import { IndexedDBManager } from './indexedDatabase.js';


interface Student {
  id?: number
  universityId: string;
  name: string;
  age: string;
  class: string;
  address: string;
}

let students: Student[] = [];

let dbManager : IndexedDBManager;


async function addStudent(e: Event) {
  
    const studentUniversityId = document.querySelector<HTMLInputElement>("#student-universityId");
    const studentName = document.querySelector<HTMLInputElement>("#student-name");
    const studentAge = document.querySelector<HTMLInputElement>("#student-age");
    const studentClass = document.querySelector<HTMLInputElement>("#student-class");
    const studentAddress = document.querySelector<HTMLInputElement>("#student-address");
    const student : Student = {
    universityId: studentUniversityId!.value, 
    name: studentName!.value, 
    age: studentAge!.value, 
    class: studentClass!.value,
    address: studentAddress!.value};

    e.preventDefault();
    
    await dbManager.add(student);
    addStudentModalClose();
    retreiveData();
  }


const Addmodal = document.querySelector<HTMLInputElement>("#addStudentModal");
const Editmodal = document.querySelector<HTMLInputElement>("#editStudentModal");
const overlay = document.querySelector<HTMLInputElement>(".overlay");
const addStudentModalBtn = document.querySelector<HTMLInputElement>("#CreateStudent");
const closeStudentModalBtn = document.querySelector<HTMLInputElement>("#cancelAddStudentBtn")
const addStudentConfirm = document.querySelector<HTMLInputElement>("#addStudentBtn");

const closeEditStudentModalBtn = document.querySelector<HTMLInputElement>("#cancelEditStudentBtn")
const editStudentConfirm = document.querySelector<HTMLInputElement>("#editStudentBtn");

addStudentModalBtn!.addEventListener(
    "click", addStudentModalOpen
);

closeStudentModalBtn!.addEventListener(
    "click", addStudentModalClose
);

closeEditStudentModalBtn!.addEventListener(
    "click", editStudentModalClose
);



addStudentConfirm!.addEventListener("click", addStudent);

function addStudentModalOpen() {
    Addmodal!.classList.remove("hidden");
    Addmodal!.classList.add("overlay");
}

function addStudentModalClose() {
    Addmodal!.classList.add("hidden");
    Addmodal!.classList.remove("overlay");
}

function editStudentModalOpen() {
    Editmodal!.classList.remove("hidden");
    Editmodal!.classList.add("overlay");
}

function editStudentModalClose() {
    Editmodal!.classList.add("hidden");
    Editmodal!.classList.remove("overlay")
}



  function createStudentRow(student: Student) {
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
    const tableBody: HTMLElement | null = document.querySelector('#student-table tbody');
    tableBody!.innerHTML = '';
    students.forEach((student) => {
      const row = createStudentRow(student);
      tableBody!.appendChild(row);
    });
  }


let Editedstudent : Student;

async function editStudent(student: Student) {
    const studentUniversityId = document.querySelector<HTMLInputElement>("#Estudent-universityId");
    const studentName = document.querySelector<HTMLInputElement>("#Estudent-name");
    const studentAge = document.querySelector<HTMLInputElement>("#Estudent-age");
    const studentClass = document.querySelector<HTMLInputElement>("#Estudent-class");
    const studentAddress = document.querySelector<HTMLInputElement>("#Estudent-address");

    console.log(`Editing student ${student.name}: ${student.id}`);

    student = await dbManager.getById(student.id as number);
    if(student) {
      //assigning values to modal
      console.log(student);
      studentUniversityId!.value = student.universityId;
      studentName!.value = student.name ;
      studentAge!.value = student.age;
      studentClass!.value = student.class;
      studentAddress!.value = student.address;
      Editedstudent = student;
      editStudentModalOpen();
    }
  }
  

  editStudentConfirm!.addEventListener(
    "click", async () => {
        const studentUniversityId = document.querySelector<HTMLInputElement>("#Estudent-universityId");
        const studentName = document.querySelector<HTMLInputElement>("#Estudent-name");
        const studentAge = document.querySelector<HTMLInputElement>("#Estudent-age");
        const studentClass = document.querySelector<HTMLInputElement>("#Estudent-class");
        const studentAddress = document.querySelector<HTMLInputElement>("#Estudent-address");
  
        Editedstudent.name = studentName!.value;
        Editedstudent.age = studentAge!.value;
        Editedstudent.class = studentClass!.value;
        Editedstudent.universityId = studentUniversityId!.value;
        Editedstudent.address = studentAddress!.value;
        
        console.log(Editedstudent);
        await dbManager.edit(Editedstudent);
        console.log('Student updated successfully');
        editStudentModalClose();
        retreiveData();
    }
  );
  
  function deleteStudent(student: Student) {
    console.log(`Deleting student: ${student.name}`);
    dbManager.deleteById(student.id as number);
    retreiveData();
  }
  

 

  window.addEventListener('load', async () => {
    dbManager = new IndexedDBManager("studentDatabase",1);
    await dbManager.dbPromise;

    console.log(dbManager.db);
    await retreiveData();
  })
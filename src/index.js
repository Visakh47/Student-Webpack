"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../style.css");
require("./indexedDatabase.js");
var indexedDatabase_js_1 = require("./indexedDatabase.js");
var students = [];
var dbManager;
function addStudent(e) {
    return __awaiter(this, void 0, void 0, function () {
        var studentUniversityId, studentName, studentAge, studentClass, studentAddress, student;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    studentUniversityId = document.querySelector("#student-universityId");
                    studentName = document.querySelector("#student-name");
                    studentAge = document.querySelector("#student-age");
                    studentClass = document.querySelector("#student-class");
                    studentAddress = document.querySelector("#student-address");
                    student = {
                        universityId: studentUniversityId.value,
                        name: studentName.value,
                        age: studentAge.value,
                        class: studentClass.value,
                        address: studentAddress.value
                    };
                    e.preventDefault();
                    return [4 /*yield*/, dbManager.add(student)];
                case 1:
                    _a.sent();
                    addStudentModalClose();
                    retreiveData();
                    return [2 /*return*/];
            }
        });
    });
}
var Addmodal = document.querySelector("#addStudentModal");
var Editmodal = document.querySelector("#editStudentModal");
var overlay = document.querySelector(".overlay");
var addStudentModalBtn = document.querySelector("#CreateStudent");
var closeStudentModalBtn = document.querySelector("#cancelAddStudentBtn");
var addStudentConfirm = document.querySelector("#addStudentBtn");
var closeEditStudentModalBtn = document.querySelector("#cancelEditStudentBtn");
var editStudentConfirm = document.querySelector("#editStudentBtn");
addStudentModalBtn.addEventListener("click", addStudentModalOpen);
closeStudentModalBtn.addEventListener("click", addStudentModalClose);
closeEditStudentModalBtn.addEventListener("click", editStudentModalClose);
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
    Editmodal.classList.remove("overlay");
}
function createStudentRow(student) {
    var row = document.createElement('tr');
    var nameCell = document.createElement('td');
    nameCell.id = 'studentName';
    nameCell.textContent = student.name;
    var ageCell = document.createElement('td');
    ageCell.textContent = student.age;
    var classCell = document.createElement('td');
    classCell.textContent = student.class;
    var addressCell = document.createElement('td');
    addressCell.textContent = student.address;
    var universityIdCell = document.createElement('td');
    universityIdCell.textContent = student.universityId;
    var actionsCell = document.createElement('td');
    actionsCell.id = "studentActions";
    var editButton = document.createElement('button');
    editButton.id = 'EditButton';
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function () { return editStudent(student); });
    var deleteButton = document.createElement('button');
    deleteButton.id = 'DeleteButton';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function () { return deleteStudent(student); });
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
function retreiveData() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dbManager.getAll()];
                case 1:
                    students = _a.sent();
                    renderTable();
                    return [2 /*return*/];
            }
        });
    });
}
function renderTable() {
    var tableBody = document.querySelector('#student-table tbody');
    tableBody.innerHTML = '';
    students.forEach(function (student) {
        var row = createStudentRow(student);
        tableBody.appendChild(row);
    });
}
var Editedstudent;
function editStudent(student) {
    return __awaiter(this, void 0, void 0, function () {
        var studentUniversityId, studentName, studentAge, studentClass, studentAddress;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    studentUniversityId = document.querySelector("#Estudent-universityId");
                    studentName = document.querySelector("#Estudent-name");
                    studentAge = document.querySelector("#Estudent-age");
                    studentClass = document.querySelector("#Estudent-class");
                    studentAddress = document.querySelector("#Estudent-address");
                    console.log("Editing student ".concat(student.name, ": ").concat(student.id));
                    return [4 /*yield*/, dbManager.getById(student.id)];
                case 1:
                    student = _a.sent();
                    if (student) {
                        //assigning values to modal
                        console.log(student);
                        studentUniversityId.value = student.universityId;
                        studentName.value = student.name;
                        studentAge.value = student.age;
                        studentClass.value = student.class;
                        studentAddress.value = student.address;
                        Editedstudent = student;
                        editStudentModalOpen();
                    }
                    return [2 /*return*/];
            }
        });
    });
}
editStudentConfirm.addEventListener("click", function () { return __awaiter(void 0, void 0, void 0, function () {
    var studentUniversityId, studentName, studentAge, studentClass, studentAddress;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                studentUniversityId = document.querySelector("#Estudent-universityId");
                studentName = document.querySelector("#Estudent-name");
                studentAge = document.querySelector("#Estudent-age");
                studentClass = document.querySelector("#Estudent-class");
                studentAddress = document.querySelector("#Estudent-address");
                Editedstudent.name = studentName.value;
                Editedstudent.age = studentAge.value;
                Editedstudent.class = studentClass.value;
                Editedstudent.universityId = studentUniversityId.value;
                Editedstudent.address = studentAddress.value;
                console.log(Editedstudent);
                return [4 /*yield*/, dbManager.edit(Editedstudent)];
            case 1:
                _a.sent();
                console.log('Student updated successfully');
                editStudentModalClose();
                retreiveData();
                return [2 /*return*/];
        }
    });
}); });
function deleteStudent(student) {
    console.log("Deleting student: ".concat(student.name));
    dbManager.deleteById(student.id);
    retreiveData();
}
window.addEventListener('load', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                dbManager = new indexedDatabase_js_1.IndexedDBManager("studentDatabase", 1);
                return [4 /*yield*/, dbManager.dbPromise];
            case 1:
                _a.sent();
                console.log(dbManager.db);
                return [4 /*yield*/, retreiveData()];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });

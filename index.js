const textArea = document.querySelector(".textarea");
const studentId = document.querySelector(".studentid");
const studentClass = document.querySelector(".studentclass");
const rollNo = document.querySelector(".rollno");
const contact=document.querySelector(".contactno");
const email=document.querySelector(".email");
const button = document.querySelector(".buttoninput");
const registrationList = document.querySelector(".registrationList");

// Load students from local storage on page load
document.addEventListener("DOMContentLoaded", loadStudents);

// Function to load students from local storage
function loadStudents() {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    students.forEach(student => {
        createStudentEntry(student);
    });
}

button.addEventListener("click", addregistrationListItem);

function addregistrationListItem(event) {
    event.preventDefault(); // Prevent form submission

    // Create a new student object
    const student = {
        name: textArea.value,
        id: studentId.value,
        class: studentClass.value,
        roll: rollNo.value,
        contact: contact.value,
        email: email.value,

    };
   
    if (!validateInputs(student)) return; // Validate inputs

    // Create a new student entry
    createStudentEntry(student);
    // Save to local storage
    saveToLocalStorage(student);

    // Clear input fields
    clearInputs();
}

function createStudentEntry(student) {
    const registrationDiv = document.createElement("div");
    registrationDiv.classList.add("itemall");

    const item = document.createElement("p");
    item.innerHTML = `Name: ${student.name}, ID: ${student.id}, Class: ${student.class}, Roll No: ${student.roll} , Contact No: ${student.contact}, E-mail: ${student.email}`;
    item.classList.add("item");

    registrationDiv.appendChild(item);

    // Create edit button
    const editButton = document.createElement("button");
    editButton.innerHTML = '<i class="fa-solid fa-pen"></i>'; //edit icon
    editButton.classList.add("edit-button");
    registrationDiv.appendChild(editButton);

    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fa-solid fa-trash-can-arrow-up"></i>'; // icon for deleting
    deleteButton.classList.add("trash-button");
    registrationDiv.appendChild(deleteButton);

    registrationList.appendChild(registrationDiv);

    // Event listeners for edit and delete
    editButton.addEventListener("click", () => editStudent(student, registrationDiv));
    deleteButton.addEventListener("click", () => deleteItem(registrationDiv));
}

function saveToLocalStorage(student) {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));
}

function clearInputs() {
    textArea.value = '';
    studentId.value = '';
    studentClass.value = '';
    rollNo.value = '';
    contact.value= '';
    email.value='';
}


function validateInputs(student) {
    const idPattern = /^[0-9]+$/; // Only numbers
    const namePattern = /^[A-Za-z\s]+$/; // Only characters
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; //email regex

        // Validate for empty fields
        if (!student.name.trim()) {
            alert("Name cannot be empty!");
            return false;
        }
        if (!student.id.trim()) {
            alert("Student ID cannot be empty!");
            return false;
        }
        if (!student.class.trim()) {
            alert("Class cannot be empty!");
            return false;
        }
        if (!student.roll.trim()) {
            alert("Roll No cannot be empty!");
            return false;
        }
        if (!student.contact.trim()) {
            alert("Contact No cannot be empty!");
            return false;
        }
        if (!student.email.trim()) {
            alert("Email cannot be empty!");
            return false;
        }

    if (!namePattern.test(student.name)) {
        alert("Invalid name! Only characters are allowed.");
        return false;
    }

    if (!idPattern.test(student.class)) {
        alert("Invalid class! Only numbers are allowed.");
        return false;
    }
    if (!idPattern.test(student.id)) {
        alert("Invalid ID! Only numbers are allowed.");
        return false;
    }
    if (!idPattern.test(student.roll)) {
        alert("Invalid Roll No! Only numbers are allowed.");
        return false;
    }
    if (!idPattern.test(student.contact)) {
        alert("Invalid Contact No! Only numbers are allowed.");
        return false;
    }
    if (!emailPattern.test(student.email)) {
        alert("Invalid Email! Provide valid email id.");
        return false;
    }
    return true;
}

function editStudent(student, registrationDiv) {
    textArea.value = student.name;
    studentId.value = student.id;
    studentClass.value = student.class;
    rollNo.value = student.roll;
    contact.value=student.contact;
    email.value=student.email;

    // Remove the existing entry from the list
    registrationDiv.remove();
    
}

function deleteItem(registrationDiv) {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const index = Array.from(registrationList.children).indexOf(registrationDiv);
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    registrationDiv.remove();
}

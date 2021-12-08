import { initializeApp } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js";
import { firebaseConfig } from "./firebaseconfig.js";
import {getDatabase, ref, get, set, child, update, remove} from "https://www.gstatic.com/firebasejs/9.2.0/firebase-database.js";

//initialize app
const app = initializeApp(firebaseConfig);

//initialize database
const database = getDatabase();

//********************** References ******************
const btnSubmit = document.getElementById("project-contact-us-button");
const contactForm = document.getElementById("project-contact-form");
//************ eventListeners ************
contactForm.addEventListener("submit",(e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const mobile = document.getElementById("phone").value;
    const message = document.getElementById("message").value;
    
    if (!email || !mobile || !name || !message) {
        alert("Please fill all fields.");
    } else {
        btnSubmit.style.cursor = "not-allowed";
        btnSubmit.setAttribute("disabled","disabled");
        btnSubmit.style.opacity = 0.7;
        insertData(name, email, mobile, message);
    }
}); //end of sign-up-btn block


//*********** Functions ***********************
function insertData(name, email, mobile, message){
    const contactRef = ref(database, '/contact/'+mobile);

    set(contactRef, {
        name    : name,
        email   : email,
        mobile  : mobile,
        message : message
    })
    .then(() => {
        alert("Thank you for showing your interest, we will contact you soon!");
    })
    .catch((error) => {
        alert("unsuccessful, error: "+error);
    });
}//end of insertData function
// Gestion des transitions entre Login et Register
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const loginForm = document.getElementById("login");
const registerForm = document.getElementById("register");

function login() {
    loginForm.style.left = "4px";
    registerForm.style.right = "-520px";
    loginBtn.classList.add("white-btn");
    registerBtn.classList.remove("white-btn");
    loginForm.style.opacity = 1;
    registerForm.style.opacity = 0;
}

function logout() {
    loginForm.style.left = "-510px";
    registerForm.style.right = "5px";
    loginBtn.classList.remove("white-btn");
    registerBtn.classList.add("white-btn");
    loginForm.style.opacity = 0;
    registerForm.style.opacity = 1;
}

// Gestion des utilisateurs avec LocalStorage
let users = JSON.parse(localStorage.getItem("users")) || [];

// Expressions régulières
const emailV = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordV = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const nameV = /^[a-zA-Z]+$/;

function Enregistrement() {
    const firstname = document.getElementById("Firstname").value.trim();
    const lastname = document.getElementById("Lastname").value.trim();
    const email = document.getElementById("Email").value.trim();
    const password = document.getElementById("Password").value.trim();

    if (!firstname || !nameV.test(firstname)) {
        document.getElementById("registerMessage").textContent = "Prénom non valide";
        return;
    }
    if (!lastname || !nameV.test(lastname)) {
        document.getElementById("registerMessage").textContent = "Nom non valide";
        return;
    }
    if (!email || !emailV.test(email)) {
        document.getElementById("registerMessage").textContent = "Email non valide";
        return;
    }
    if (!password || !passwordV.test(password)) {
        document.getElementById("registerMessage").textContent = "Mot de passe non valide (min 8 caractères, 1 lettre et 1 chiffre)";
        return;
    }
    if (users.some(user => user.email === email)) {
        document.getElementById("registerMessage").textContent = "Email déjà utilisé";
        return;
    }

    users.push({ firstname, lastname, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    document.getElementById("registerMessage").textContent = "Utilisateur enregistré avec succès !";
    clearForm("register");
}

function acces() {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!email || !emailV.test(email)) {
        document.getElementById("loginMessage").textContent = "Format d'email invalide !";
        return;
    }
    if (!password) {
        document.getElementById("loginMessage").textContent = "Mot de passe requis !";
        return;
    }

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        document.getElementById("loginMessage").textContent = `Bienvenue, ${user.firstname} !`;
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("loginMessage").textContent = "Email ou mot de passe incorrect !";
    }

    clearForm("login");
}

function clearForm(type) {
    document.querySelectorAll(`#${type} .input-field`).forEach(input => input.value = "");
}

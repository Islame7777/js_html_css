 // Gestion des transitions entre Login et Register
 var a = document.getElementById("loginBtn");
 var b = document.getElementById("registerBtn");
 var x = document.getElementById("login");
 var y = document.getElementById("register");

 function login() {
     x.style.left = "4px";
     y.style.right = "-520px";
     a.className += " white-btn";
     b.className = "btn";
     x.style.opacity = 1;
     y.style.opacity = 0;
 }

 function logout() {
     x.style.left = "-510px";
     y.style.right = "5px";
     a.className = "btn";
     b.className += " white-btn";
     x.style.opacity = 0;
     y.style.opacity = 1;
 }
 
 // Gestion des utilisateurs avec LocalStorage
 let users = JSON.parse(localStorage.getItem("users")) || [];
   // Expressions régulières
   const emailV = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   const passwordV = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Min 8 caractères, une lettre, un chiffre
   const nameV = /^[a-zA-Z]+$/; // Noms contenant uniquement des lettres
   function Enregistrement() {
     const firstname = document.getElementById("Firstname").value.trim();
     const lastname = document.getElementById("Lastname").value.trim();
     const email = document.getElementById("Email").value.trim();
     const password = document.getElementById("Password").value.trim();
     // Validation des champs avec des regex
     if (!firstname || !nameV.test(firstname)) {
         document.getElementById("registerMessage").textContent = "firstname non valider";
         return;
     }
     else if (!lastname || !nameV.test(lastname)) {
         document.getElementById("registerMessage").textContent = "lastname non valider";
         return;
     }
      else if (!email || !emailV.test(email)) {
         document.getElementById("registerMessage").textContent = "email non valider";
         return;
     }
     else if (!password || !passwordV.test(password)) {
         document.getElementById("registerMessage").textContent = "password non valider";
         return;
     }  // Vérification si l'email existe déjà
    //  some fct return true false 
     if (users.some(user => user.email === email)) {
         document.getElementById("registerMessage").textContent = "Email existe deja";
         return;
     }
           // Enregistrer l'utilisateur dans le tableau
        //    kadkhel les info f localstorage
           users.push({ firstname, lastname, email, password });
           localStorage.setItem("users", JSON.stringify(users));
           document.getElementById("registerMessage").textContent = "User registered successfully!";
        // input
           clearForm("register");
       }
       function acces() {
         const email = document.getElementById("loginEmail").value.trim();
         const password = document.getElementById("loginPassword").value.trim();
//expression reguliere
         if (!email || !emailV.test(email))  {
             document.getElementById("loginMessage").textContent = "Invalid email format!";
             return;}
         
        if (!password) {
             document.getElementById("loginMessage").textContent = "Password is required!";
             return;}
         
 
         // Vérifier si l'email et le mot de passe correspondent
         const user = users.find(user => user.email === email && user.password === password);
         
 
         if (user) {
             document.getElementById("loginMessage").textContent = `Welcome back, ${user.firstname}!`;
             window.location.href = "dashboard.html";
         } else {
             document.getElementById("loginMessage").textContent = "Invalid email or password!";
         }
 
         clearForm("login");}
     

// kat 9lb 3la id f html u kat7t fih les valeurs o fhqd e cas input vides 
       function clearForm(type) {
         document.querySelectorAll(`#${type} .input-field`).forEach(input => (input.value = ""));
     }
 
// Fonction pour afficher ou masquer la modale
const toggleAddModal = () => {
    const affiche = document.getElementById('formulaire');
    affiche.classList.toggle('hidden');
}

// Fonction pour enregistrer les données du formulaire
const save = (e) => {
    e.preventDefault();

    try {
        const id = document.getElementById("categoryId").value;
        const nomCategorie = document.getElementById("categoryName").value.trim();
        const status = document.getElementById('categoryStatus').value.trim();
        const Description = document.getElementById("categoryDescription").value.trim();

        // Vérification des champs
        if (!nomCategorie || !status || !Description) {
            throw new Error("Tous les champs doivent être remplis.");
        }

        const newCategories = {
            name: nomCategorie,
            status: status,
            Description: Description,
        };

        // Récupérer les catégories du localStorage
        let categorie = JSON.parse(localStorage.getItem('categorie')) || [];
        if (id) {
            // Si un ID est présent, on met à jour la catégorie existante
            categorie[id] = newCategories;
        } else {
            // Sinon, on ajoute une nouvelle catégorie
            categorie.push(newCategories);
        }

        // Sauvegarder les catégories dans le localStorage
        localStorage.setItem('categorie', JSON.stringify(categorie));

        // Réinitialiser le formulaire et fermer la modale
        document.getElementById('categoryForm').reset();
        toggleAddModal();

        // Rafraîchir l'affichage des catégories
        afficherCategories();
    } catch (error) {
        // Affichage de l'erreur dans la console ou alerte
        console.error("Erreur lors de l'enregistrement des données:", error);
        alert("Erreur: " + error.message);
    }
}

// Fonction pour afficher les catégories dans le tableau
const afficherCategories = () => {
    try {
        let categorie = JSON.parse(localStorage.getItem('categorie')) || [];
        if (!Array.isArray(categorie)) {
            throw new Error("Les données des catégories sont corrompues.");
        }

        const tableBody = document.getElementById('tableId');
        tableBody.innerHTML = ''; // Effacer les lignes existantes

        // Ajouter chaque catégorie dans la table
        categorie.forEach((categories, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-6 py-4">${categories.name}</td>
                <td class="px-6 py-4">${categories.Description}</td>
                <td class="px-6 py-4">${categories.status}</td>
                <td class="px-6 py-4">
                    <button class="text-blue-600 hover:underline" onclick="editCategorie(${index})"> <i class="fas fa-edit"></i></button>
                    <button class="text-red-600 hover:underline" onclick="deleteCategorie(${index})"> <i class="fas fa-trash"></i></button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Erreur lors de l'affichage des catégories:", error);
        alert("Erreur: Impossible d'afficher les catégories.");
    }
}

// Fonction pour éditer une catégorie
const editCategorie = (index) => {
    try {
        let categorie = JSON.parse(localStorage.getItem('categorie')) || [];
        const categorieToEdit = categorie[index];

        // Vérification si l'indice est valide
        if (!categorieToEdit) {
            throw new Error("Catégorie introuvable.");
        }

        // Remplir le formulaire avec les données de la catégorie à modifier
        document.getElementById("categoryId").value = index;
        document.getElementById("categoryName").value = categorieToEdit.name;
        document.getElementById('categoryStatus').value = categorieToEdit.status;
        document.getElementById("categoryDescription").value = categorieToEdit.Description;

        toggleAddModal();
    } catch (error) {
        console.error("Erreur lors de l'édition de la catégorie:", error);
        alert("Erreur: " + error.message);
    }
}

// Fonction pour supprimer une catégorie
const deleteCategorie = (index) => {
    try {
        let categorie = JSON.parse(localStorage.getItem('categorie')) || [];

        // Vérification de la validité de l'index
        if (index < 0 || index >= categorie.length) {
            throw new Error("Index de catégorie invalide.");
        }

        // Suppression de la catégorie à l'index spécifié
        categorie.splice(index, 1);
        localStorage.setItem('categorie', JSON.stringify(categorie));

        // Rafraîchir l'affichage des catégories
        afficherCategories();
    } catch (error) {
        console.error("Erreur lors de la suppression de la catégorie:", error);
        alert("Erreur: " + error.message);
    }
}

// Gestion de la déconnexion
const handleLogout = () => {
    try {
        const confirmation = confirm("Êtes-vous sûr de vouloir vous déconnecter ?");
        if (confirmation) {
            // Rediriger vers la page de connexion
            window.location.href = "compte.html";
        }
    } catch (error) {
        console.error("Erreur lors de la déconnexion:", error);
        alert("Erreur lors de la déconnexion.");
    }
}

// Écouteur d'événements pour l'enregistrement du formulaire
document.getElementById('categoryForm').addEventListener('submit', save);

// Affichage des catégories au chargement de la page
document.addEventListener('DOMContentLoaded', afficherCategories);

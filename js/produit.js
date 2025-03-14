
    // Fonction pour basculer la visibilité du formulaire
    function toggleAddModal() {
        const affiche = document.getElementById('formulaire');
        affiche.classList.toggle('hidden');
    }
    
    // Fonction pour afficher les produits dans le tableau
    function afficherProduits() {
        let products = JSON.parse(localStorage.getItem('products')) || [];
        const categories = JSON.parse(localStorage.getItem('categorie')) || [];
       
        const tableBody = document.getElementById('tableId');
        tableBody.innerHTML = ''; // Effacer les lignes existantes
        
        products.forEach((product, index) => {
            let categorie = categories.find(categorie => categorie.name === product.category); // Chercher une catégorie avec le même nom
            if (categorie){
                const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-6 py-4">${product.name}</td>
                <td class="px-6 py-4">${product.category}</td>
                <td class="px-6 py-4">${product.price} Dhs</td>
                <td class="px-6 py-4">${product.stock}</td>
                <td class="px-6 py-4">
                    <button class="text-blue-600 hover:underline" onclick="editProduct(${index})">  <i class="fas fa-edit"></i></button>
                    <button class="text-red-600 hover:underline" onclick="deleteProduct(${index})"> <i class="fas fa-trash"></i></button>
                </td>
            `;
            tableBody.appendChild(row);
        }
        });

        updateTotalProducts();
        updateTotalstock();
        alertStock();
           averagePrice();
         
       
    }
    function selectCategorie() {
        let categorie = JSON.parse(localStorage.getItem('categorie')) || [];
        const selectBody = document.getElementById('productCategory');
        selectBody.innerHTML = `<option  disabled selected></option>`; // Ajout de l'option par défaut
    
        categorie.forEach((categories) => {
            const option = document.createElement('option');
            option.value = categories.name;
            option.textContent = categories.name;
            selectBody.appendChild(option); // Ajouter chaque option au select
        });
    }
    
    // Fonction pour enregistrer ou mettre à jour un produit
    function enregistrer(e) {
        e.preventDefault(); // Empêcher la soumission classique du formulaire
        
        const productId = document.getElementById('productId').value; // dayrin feha hidden bch it genera automatiquement
        const productName = document.getElementById('productName').value.trim();
        const productCategory = document.getElementById('productCategory').value.trim();
        const productPrice = document.getElementById('productPrice').value.trim();
        const productStock = document.getElementById('productStock').value.trim();
    
      
    
        // de facon json
        const newProduct = {
            name: productName,
            category: productCategory,
            price: productPrice,
            stock: productStock
        };
    
        // Récupérer les produits existants du localStorage
        let products = JSON.parse(localStorage.getItem('products')) || [];
    
        if (productId) {
            // Si un ID est présent, on met à jour le produit existant
            products[productId] = newProduct;
        } else {
            // Sinon, on ajoute un nouveau produit
            products.push(newProduct);
        }
    
        // Sauvegarder les produits dans localStorage
        localStorage.setItem('products', JSON.stringify(products));
    
        // Réinitialiser le formulaire et afficher la liste des produits
        document.getElementById('productForm').reset();
        toggleAddModal();
        afficherProduits();
        updateTotalProducts();
        updateTotalstock();
        alertStock()
       averagePrice();
     
   
    }
    
    // Fonction pour éditer un produit
    function editProduct(index) {
        // Récupérer les produits du localStorage
        let products = JSON.parse(localStorage.getItem('products')) || [];
        const product = products[index];
    
        // Afficher le formulaire avec les informations du produit à modifier
        document.getElementById('productName').value = product.name;
        document.getElementById('productCategory').value = product.category;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productStock').value = product.stock;
    
        // Enregistrer l'ID du produit à modifier dans un champ caché
        document.getElementById('productId').value = index;
        toggleAddModal()
        updateTotalProducts();
        updateTotalstock();
        alertStock()
           averagePrice();

    }
    
    // Fonction pour supprimer un produit
    function deleteProduct(index) {
        // Récupérer les produits du localStorage
        let products = JSON.parse(localStorage.getItem('products')) || [];
    
        // Supprimer le produit
        products.splice(index, 1);
    
        // Sauvegarder les produits dans localStorage
        localStorage.setItem('products', JSON.stringify(products));
    
        // Réafficher les produits après suppression
    
        afficherProduits();
        updateTotalProducts();
        updateTotalstock()
        alertStock()
        averagePrice();
    
      
    }
    function handleLogout() {
        const confirmation = confirm("Êtes-vous sûr de vouloir vous déconnecter ?");
        if (confirmation) {
            // Rediriger vers la page de connexion ou autre action
            window.location.href = "compte.html";
        }
    }
    
    // Afficher les produits lors du chargement de la page
    document.addEventListener('DOMContentLoaded', afficherProduits);  
    document.addEventListener('DOMContentLoaded', selectCategorie);
    
    // Ajouter un écouteur d'événement pour la soumission du formulaire
    document.getElementById('productForm').addEventListener('submit', enregistrer);
  
     
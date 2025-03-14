 
  function updateTotalProducts() {
    // Récupérer les produits du localStorage
    let products = JSON.parse(localStorage.getItem('products')) || [];
    const categories = JSON.parse(localStorage.getItem('categorie')) || [];
    let totalProducts = 0;
    products.forEach((product) => {
        let categorie = categories.find(cat => cat.name === product.category);
        if (categorie) {
            totalProducts++;
        }
    });

    // Afficher le total des produits
    document.getElementById('totalProducts').textContent = totalProducts;
}

function alertStock() {
    // Récupérer les produits du localStorage
    let products = JSON.parse(localStorage.getItem('products')) || [];
    let lowStockCount = products.filter(product => product.stock && product.stock < 500).length;
    
    // Mettre à jour le nombre total de produits dans l'élément avec l'ID 'totalProducts'
    document.getElementById('lowStockProducts').textContent =lowStockCount;
}

function averagePrice() {
    let products = JSON.parse(localStorage.getItem('products')) || [];        
     let averagePrice = 0;
     products.forEach(product => {
        averagePrice += parseFloat(product.price) * parseInt(product.stock);
     });
  

     document.getElementById('averagePrice').textContent = averagePrice.toFixed(2) + " Dhs";
}
function updateTotalstock(){
    let products = JSON.parse(localStorage.getItem('products')) || []; 
    let stock = 0;
    products.forEach(product => {
       stock += parseInt(product.stock);
    });
 
    document.getElementById('stock').textContent =stock;
}
function updateTotalCategories(){
    let Categorie=JSON.parse(localStorage.getItem('categorie'))||[];
    document.getElementById('totalCategories').textContent = Categorie.length;
}
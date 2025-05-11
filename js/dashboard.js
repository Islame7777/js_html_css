// Initialisation des graphiques
    function graph() {
        // Graphique des catégories
        const categoryCtx = document.getElementById('graphCate').getContext('2d');
        new Chart(categoryCtx, {
            type: 'doughnut',
            data: {
                labels: ['Peinture Cuir', 'Peinture Acrylique', 'Pinceaux', 'Accessoires'],
                datasets: [{
                    data: [30, 25, 20, 25],
                    backgroundColor: ['#68423D', '#7B5343', '#87624A', '#32342d']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    
        // Graphique des ventes
        const salesCtx = document.getElementById('ventegraph').getContext('2d');
        new Chart(salesCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
                datasets: [{
                    label: 'Ventes',
                    data: [650, 590, 800, 810, 960, 890],
                    borderColor: '#32342d',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    // Appel des graphiques au chargement de la page
    document.addEventListener('DOMContentLoaded', function() {
        graph();
        updateTotalProducts()
        averagePrice();
        updateTotalCategories();
    });
 


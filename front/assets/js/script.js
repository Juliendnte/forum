// Sélectionner tous les éléments de sous-menu
const subMenus = document.querySelectorAll('.sousMenu');

// Parcourir tous les éléments de sous-menu et ajouter un gestionnaire d'événement de clic
subMenus.forEach(subMenu => {
    subMenu.previousElementSibling.addEventListener('click', (event) => {
        // Empêcher le comportement par défaut du lien
        event.preventDefault();
        // Basculer la classe active pour activer ou désactiver l'animation
        subMenu.nextElementSibling.classList.toggle('active');
        // Tourner le SVG
        event.currentTarget.querySelector('.arrow-svg').classList.toggle('rotate');
    });
});

document.querySelector("#show-login").addEventListener("click", function () {
    document.querySelector(".form").classList.add("active");
});
document.querySelector(".form .close-btn").addEventListener("click", function () {
    document.querySelector(".form").classList.remove("active");
});
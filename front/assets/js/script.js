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
document.querySelector(".form .btn-close").addEventListener("click", function () {
    document.querySelector(".form").classList.remove("active");
});

// fonction pour mouve le login/register
document.addEventListener('DOMContentLoaded', function() {
    const x = document.getElementById("login");
    const y = document.getElementById("register");
    const z = document.getElementById("btn");

    function register() {
        x.style.left = "-400px";
        y.style.left = "50px";
        z.style.left = "110px";
    }

    function login() {
        x.style.left = "50px";
        y.style.left = "450px";
        z.style.left = "0px";
    }

    document.getElementById("loginBtn").addEventListener("click", login);
    document.getElementById("registerBtn").addEventListener("click", register);
});

function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = (textarea.scrollHeight) + 'px';
}

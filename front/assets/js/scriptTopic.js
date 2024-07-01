const btnDotsTopic = document.getElementById('btn-header-topic-dots'); // Sélectionne le bouton "dots"
const popUpContainer = document.getElementById('pop-up_topic-ctn'); // Sélectionne le conteneur de popup

btnDotsTopic.addEventListener("click", (e) => {
    popUpContainer.classList.toggle("active");

    e.stopPropagation(); // Empêche la propagation de l'événement click au-delà du bouton
});

document.addEventListener("click", (e) => {
    if (!popUpContainer.contains(e.target)) {
        popUpContainer.classList.remove("active");
    }
});

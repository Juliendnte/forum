const btnDotsPost = document.querySelectorAll('.btn-dots-post'); // Sélectionne tous les boutons "dots"
const popUpContainers = document.querySelectorAll('.pop-up_post-ctn'); // Sélectionne tous les conteneurs de popup

btnDotsPost.forEach((btn, index) => {
    btn.addEventListener("click", (e) => {
        popUpContainers.forEach(container => {
            container.classList.remove("active");
        });

        popUpContainers[index].classList.toggle("active");

        e.stopPropagation();
    });
});

document.addEventListener("click", (e) => {
    popUpContainers.forEach(container => {
        if (!container.contains(e.target)) {
            container.classList.remove("active");
        }
    });
});

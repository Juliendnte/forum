const vueEnsemble = document.getElementById("vue-densemble");
const vuePost = document.getElementById("postes");
const vueCommentaire = document.getElementById("commentaires");

vueEnsemble.addEventListener("click", () => {
    vueEnsemble.classList.add("select");
    vuePost.classList.remove("select");
    vueCommentaire.classList.remove("select");
})

vuePost.addEventListener("click", () => {
    vuePost.classList.add("select");
    vueEnsemble.classList.remove("select");
    vueCommentaire.classList.remove("select");
})

vueCommentaire.addEventListener("click", () => {
    vueCommentaire.classList.add("select");
    vuePost.classList.remove("select");
    vueEnsemble.classList.remove("select");
})
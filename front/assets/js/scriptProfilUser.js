document.addEventListener('DOMContentLoaded', function () {
    const vueEnsemble = document.getElementById("vue-densemble");
    const vuePost = document.getElementById("postes");
    const vueCommentaire = document.getElementById("commentaires");
    const VueEnsembleCtn = document.getElementById("VueEnsembleCtn");
    const VuePostsCtn = document.getElementById("VuePostsCtn");
    const VueMessageCtn = document.getElementById("VueMessageCtn");

    // Ajoute la classe 'select' à VueEnsemble par défaut
    vueEnsemble.classList.add("select");
    VueEnsembleCtn.style.display = 'block';
    VuePostsCtn.style.display = 'none';
    VueMessageCtn.style.display = 'none';

    vueEnsemble.addEventListener("click", function () {
        VueEnsembleCtn.style.display = 'block';
        VuePostsCtn.style.display = 'none';
        VueMessageCtn.style.display = 'none';

        vueEnsemble.classList.add("select");
        vuePost.classList.remove("select");
        vueCommentaire.classList.remove("select");
    });

    vuePost.addEventListener("click", function () {
        VuePostsCtn.style.display = 'block';
        VueEnsembleCtn.style.display = 'none';
        VueMessageCtn.style.display = 'none';

        vuePost.classList.add("select");
        vueEnsemble.classList.remove("select");
        vueCommentaire.classList.remove("select");
    });

    vueCommentaire.addEventListener("click", function () {
        VueMessageCtn.style.display = 'block';
        VueEnsembleCtn.style.display = 'none';
        VuePostsCtn.style.display = 'none';

        vueCommentaire.classList.add("select");
        vueEnsemble.classList.remove("select");
        vuePost.classList.remove("select");
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const BtnFriend = document.getElementById("btnFriend");
    const BtnCloseFriend = document.getElementById("btnClosePopUPFriend");
    const PopupFriend = document.getElementById("UserFriendPopup");

    BtnFriend.addEventListener("click", function () {
        PopupFriend.classList.add('active');
    });

    BtnCloseFriend.addEventListener("click", function () {
        PopupFriend.classList.remove('active');
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const BtnFollow = document.getElementById("btnFollow");
    const BtnCloseFollow = document.getElementById("btnClosePopUPFollow");
    const PopupFollow = document.getElementById("UserFollowPopup");

    BtnFollow.addEventListener("click", function () {
        PopupFollow.classList.add('active');
    });

    BtnCloseFollow.addEventListener("click", function () {
        PopupFollow.classList.remove('active');
    });
});




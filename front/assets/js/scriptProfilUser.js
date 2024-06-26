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


document.addEventListener('DOMContentLoaded', function () {
    const navItems = document.querySelectorAll('.nav-item');
    const postsContainer = document.querySelector('.posts');
    const commentsContainer = document.querySelector('.messages');

    displayPosts();

    navItems.forEach(item => {
        item.addEventListener('click', function () {
            navItems.forEach(navItem => navItem.classList.remove('select'));
            item.classList.add('select');
            if (item.id === 'vue-densemble') {
                displayPosts();
            } else if (item.id === 'postes') {
                displayPostsOnly();
            } else if (item.id === 'commentaires') {
                displayCommentsOnly();
            }
        });
    });

    function displayPosts() {
        postsContainer.style.display = 'block';
        commentsContainer.style.display = 'block';
    }

    function displayPostsOnly() {
        postsContainer.style.display = 'block';
        commentsContainer.style.display = 'none';
    }

    function displayCommentsOnly() {
        postsContainer.style.display = 'none';
        commentsContainer.style.display = 'block';
    }
});



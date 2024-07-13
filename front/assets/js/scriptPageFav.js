document.getElementById('topic-fav').addEventListener('click', function() {
    this.classList.add('select');
    document.getElementById('post-fav').classList.remove('select');
    document.getElementById('VueTopicsFavCtn').classList.add('active');
    document.getElementById('VuePublicationFavCtn').classList.remove('active');
});

document.getElementById('post-fav').addEventListener('click', function() {
    this.classList.add('select');
    document.getElementById('topic-fav').classList.remove('select');
    document.getElementById('VueTopicsFavCtn').classList.remove('active');
    document.getElementById('VuePublicationFavCtn').classList.add('active');
});
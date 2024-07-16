document.getElementById('searchFriend').addEventListener('input', function() {
    let filter = this.value.toLowerCase();
    let friends = document.querySelectorAll('.UserFriend-item');

    friends.forEach(friend =>
        friend.getAttribute('data-name').startsWith(filter) ? friend.style.display = '' : friend.style.display = 'none');

    // Afficher ou cacher le message "Aucun suivi(e)s trouvé"
    Array.from(friends).filter(friend => friend.style.display !== 'none').length === 0
        ? document.querySelector('.message-friend-not-found').style.display = 'block'
        : document.querySelector('.message-friend-not-found').style.display = 'none';

});

document.getElementById('searchFollower').addEventListener('input', function() {
    let filter = this.value.toLowerCase();
    let followers = document.querySelectorAll('.UserFriend-item');

    followers.forEach(follower =>
        follower.getAttribute('data-name').startsWith(filter) ? follower.style.display = '' : follower.style.display = 'none');

    // Afficher ou cacher le message "Aucun followers trouvé"
    Array.from(followers).filter(follower => follower.style.display !== 'none').length === 0
        ? document.querySelector('.message-friend-not-found').style.display = 'block'
        : document.querySelector('.message-friend-not-found').style.display = 'none';
});
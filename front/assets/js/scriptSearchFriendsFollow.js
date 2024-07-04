document.getElementById('searchFriend').addEventListener('input', function() {
    let filter = this.value.toLowerCase();
    let friends = document.querySelectorAll('.UserFriend-item');

    friends.forEach(friend => {
        let name = friend.getAttribute('data-name');
        if (name.startsWith(filter)) {
            friend.style.display = '';
        } else {
            friend.style.display = 'none';
        }
    });

    // Afficher ou cacher le message "Aucun suivi(e)s trouvé"
    let visibleFriends = Array.from(friends).filter(friend => friend.style.display !== 'none');
    if (visibleFriends.length === 0) {
        document.querySelector('.message-friend-not-found').style.display = 'block';
    } else {
        document.querySelector('.message-friend-not-found').style.display = 'none';
    }
});
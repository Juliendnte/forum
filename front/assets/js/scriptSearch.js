
const url = "http://localhost:4000";

document.addEventListener('click', function(event) {
    const suggestions = document.getElementById('suggestions');
    const searchInput = document.getElementById('search-input');
    if (!suggestions.contains(event.target) && event.target !== searchInput) {
        clearSuggestions();
    }
});

async function handleInput(event) {
    const query = event.target.value;
    if (query.length > 0) {
        const response = await fetch(`${url}/search?search=${query}`);
        const data = await response.json();
        if (data.status === 200) {
            displaySuggestions(data.search);
        } else {
            clearSuggestions();
        }
    } else {
        clearSuggestions();
    }
}

function displaySuggestions(results) {
    const suggestions = document.getElementById('suggestions');
    suggestions.innerHTML = '';

    let topicsAdded = false;
    let usersAdded = false;

    const limitedTopics = results.filter(result => result.Type === 'topic').slice(0, 5);
    const users = results.filter(result => result.Type === 'user').slice(0, 1);

    limitedTopics.forEach(topic => {
        if (!topicsAdded) {
            const header = document.createElement('div');
            header.className = 'suggestion-header';
            header.textContent = 'Topics';
            suggestions.appendChild(header);
            topicsAdded = true;
        }
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        item.innerHTML = `<a href="/coder/t/${topic.Title}"><img src="${topic.Path}" alt="${topic.Title}"> <span>${topic.Title}</span></a>`;
        suggestions.appendChild(item);
    });

    users.forEach(user => {
        if (!usersAdded) {
            const header = document.createElement('div');
            header.className = 'suggestion-header';
            header.textContent = 'Personnes';
            suggestions.appendChild(header);
            usersAdded = true;
        }
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        item.innerHTML = `<a href="/coder/user/${user.Title}"><img src="${user.Path}" alt="${user.Title}"> <span>${user.Title}</span></a>`;
        suggestions.appendChild(item);
    });

    suggestions.classList.add('active');
}

function clearSuggestions() {
    const suggestions = document.getElementById('suggestions');
    suggestions.innerHTML = '';
    suggestions.classList.remove('active');
}
function addTagToUser(tagId) {
    tagId = parseInt(tagId, 10);
    const tagElement = document.getElementById('available-tags').querySelector(`[data-id="${tagId}"]`);

    if (tagElement) {
        document.getElementById('user-tags').appendChild(tagElement);

        const img = tagElement.querySelector('img');
        img.setAttribute('onclick', `removeTagFromUser(${tagId})`);

        const svg = tagElement.querySelector('.form-tags-hover-add');
        svg.className = 'form-tags-hover-remove';
        svg.setAttribute('onclick', `removeTagFromUser(${tagId})`);
        svg.innerHTML = `
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" 
                          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`;
    }
}

function removeTagFromUser(tagId) {
    tagId = parseInt(tagId, 10);
    const tagElement = document.getElementById('user-tags').querySelector(`[data-id="${tagId}"]`);

    if (tagElement) {
        document.getElementById('available-tags').appendChild(tagElement);

        const img = tagElement.querySelector('img');
        img.setAttribute('onclick', `addTagToUser(${tagId})`);

        const svg = tagElement.querySelector('.form-tags-hover-remove');
        svg.className = 'form-tags-hover-add';
        svg.setAttribute('onclick', `addTagToUser(${tagId})`);
        svg.innerHTML = `
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" 
                          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`;
    }
}

function submitForm() {
    const userTags = document.getElementById('user-tags').querySelectorAll('.form-tags-ctn-img');
    const selectedTags = [];
    userTags.forEach(tag => {
        selectedTags.push(parseInt(tag.getAttribute('data-id'), 10));
    });
    document.getElementById('selected-tags').value = "[" + selectedTags.join(',') + "]";
    document.getElementById('tags-form').submit();
}

document.getElementById('profileImageInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => document.getElementById('profileImagePreview').src = e.target.result;
        reader.readAsDataURL(file);
    }
});



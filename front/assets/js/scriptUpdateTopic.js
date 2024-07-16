document.getElementById('profileImageInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => document.getElementById('profileImagePreview').src = e.target.result;
        reader.readAsDataURL(file);
    }
});
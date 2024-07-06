const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

document.addEventListener('DOMContentLoaded', (event) => {
    const passwordInput = document.getElementById('password');
    const submitButton = document.getElementById('submit-btn');
    const requirements = {
        length: document.getElementById('length'),
        number: document.getElementById('number'),
        uppercase: document.getElementById('uppercase'),
        special: document.getElementById('special')
    };

    const checkPassword = () => {
        const value = passwordInput.value;
        const lengthValid = value.length >= 8;
        const numberValid = /\d/.test(value);
        const uppercaseValid = /[A-Z]/.test(value);
        const specialValid = /[!@#$%^&*(),.?":{}|<>]/.test(value);

        requirements.length.className = lengthValid ? 'valid' : 'invalid';
        requirements.number.className = numberValid ? 'valid' : 'invalid';
        requirements.uppercase.className = uppercaseValid ? 'valid' : 'invalid';
        requirements.special.className = specialValid ? 'valid' : 'invalid';

        const allValid = lengthValid && numberValid && uppercaseValid && specialValid;
        submitButton.disabled = !allValid;
    };

    passwordInput.addEventListener('input', checkPassword);
});

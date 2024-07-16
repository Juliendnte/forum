const container = document.getElementById('container');

document.getElementById('register').addEventListener('click', () => {
    container.classList.add("active");
});

document.getElementById('login').addEventListener('click', () => {
    container.classList.remove("active");
});

document.addEventListener('DOMContentLoaded', (event) => {
    const passwordInput = document.getElementById('password');
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
        document.getElementById('submit-btn').disabled = !allValid;
    };

    passwordInput.addEventListener('input', checkPassword);
});

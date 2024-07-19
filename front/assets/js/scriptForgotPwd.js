document.addEventListener('DOMContentLoaded', (event) => {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const submitButton = document.getElementById('submit-btn');
    const confirmPasswordMessage = document.getElementById('confirm-password-message');
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
        const passwordsMatch = value === confirmPasswordInput.value;

        confirmPasswordMessage.className = passwordsMatch ? 'valid' : 'invalid';
        confirmPasswordMessage.style.display = passwordsMatch ? 'none' : 'block';

        submitButton.disabled = !(allValid && passwordsMatch);
    };

    passwordInput.addEventListener('input', checkPassword);
    confirmPasswordInput.addEventListener('input', checkPassword);
});
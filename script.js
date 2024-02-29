const lengthRange = document.getElementById('length');
const lengthValue = document.getElementById('lengthValue');
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');
const generateButton = document.getElementById('generate');
const copyButton = document.getElementById('copy');
const passwordDisplay = document.getElementById('passwordDisplay');
const strengthDisplay = document.getElementById('strengthDisplay');

const generatePassword = () => {
    const length = lengthRange.value;
    const includeUppercase = uppercaseCheckbox.checked;
    const includeLowercase = lowercaseCheckbox.checked;
    const includeNumbers = numbersCheckbox.checked;
    const includeSymbols = symbolsCheckbox.checked;

    const charset = [];
    if (includeUppercase) charset.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    if (includeLowercase) charset.push('abcdefghijklmnopqrstuvwxyz');
    if (includeNumbers) charset.push('0123456789');
    if (includeSymbols) charset.push('!@#$%^&*()_+{}[]');

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomCharset = charset[Math.floor(Math.random() * charset.length)];
        password += randomCharset[Math.floor(Math.random() * randomCharset.length)];
    }

    return password;
};

generateButton.addEventListener('click', () => {
    const password = generatePassword();
    passwordDisplay.textContent = password;

    const optionsCount = [uppercaseCheckbox, lowercaseCheckbox, numbersCheckbox, symbolsCheckbox].filter(checkbox => checkbox.checked).length;
    let strength = '';
    if (lengthRange.value < 8 || optionsCount < 3) {
        strength = 'WEAK';
    } else if (lengthRange.value >= 8 && optionsCount === 3) {
        strength = 'MEDIUM';
    } else if (lengthRange.value >= 8 && optionsCount === 4) {
        strength = 'STRONG';
    }
    strengthDisplay.textContent = `Strength: ${strength}`;
});

copyButton.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = passwordDisplay.textContent;
    if (!password) return;
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard');
});

lengthRange.addEventListener('input', () => {
    lengthValue.textContent = lengthRange.value;
});

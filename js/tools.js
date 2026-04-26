function templateManager() {
    // Display
    // Create the display area for template
    const displayArea = document.createElement('div');
    displayArea.id = 'tools';
    document.querySelector('main').appendChild(displayArea);

    document.querySelectorAll('#horizontal-select button').forEach(btn => {
        // Show template with same id as the button id
        btn.addEventListener('click', () => {
            const tmpl = document.querySelector(`template#${btn.id}`);
            if (!tmpl) return;

            displayArea.innerHTML = '';
            const clone = tmpl.content.cloneNode(true);
            displayArea.appendChild(clone);

            if(btn.id == 'password') {
                console.log('Selected template: ' + btn.id);
                initPasswordGenerator(displayArea);
            }
            if (btn.id == 'encryptor') {
                console.log('Selected template: ' + btn.id);
                initEncryptor(displayArea);
            }
        });
    });
    console.log('Starting template: password');
    const tmpl = document.querySelector(`template#password`);
    displayArea.innerHTML = '';
    const clone = tmpl.content.cloneNode(true);
    displayArea.appendChild(clone);
    initPasswordGenerator(displayArea);
}

function setupCopyButton(button, getTextCallback) {
    if (!button) return;

    button.addEventListener('click', () => {
        const text = getTextCallback();
        
        if (!text) return;

        navigator.clipboard.writeText(text)
            .then(() => {
                console.log('Copied to clipboard: ' + text);
            })
            .catch(err => {
                console.error('Failed to copy:', err);
            });
        });
}

function initPasswordGenerator(displayArea) {
    // Function for password generation
    const arrpwd = [
    'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p',
    'q','r','s','t','u','v','w','x','y','z',
    'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P',
    'Q','R','S','T','U','V','W','X','Y','Z',
    '1','2','3','4','5','6','7','8','9','0',
    '!','@','#','$','%','&','?','-','+','=', '~'
    ];
    function generatePassword(length) {
        let pwd = '';
        for (let i = 0; i < length; i++) {
            const idx = Math.floor(Math.random() * arrpwd.length);
            pwd += arrpwd[idx];
        }
        return pwd;
    }

    const genBtn = displayArea.querySelector('#password-start');
    const out    = displayArea.querySelector('#password-text');
    const lengthRange = displayArea.querySelector('#password-length');
    const lengthLabel  = displayArea.querySelector('label[for="password-length"]');
    if (genBtn && out && lengthRange && lengthLabel) {
        const syncLabel = () => lengthLabel.textContent = lengthRange.value;
        syncLabel();
        lengthRange.addEventListener('input', syncLabel);

        genBtn.addEventListener('click', () => {
            const len = Number(lengthRange.value) || 16;
            out.value = generatePassword(len);
        });
    }

    const copyBtn = displayArea.querySelector('#password-copy');

    setupCopyButton(copyBtn, () => {
        return displayArea.querySelector('#password-text').value;
    });
}

function initEncryptor(displayArea) {
    const container = displayArea;
        
    // Encrypt
    const encryptBtn = container.querySelector('.encryptor-encrypt-btn');
    const copyEncryptedBtn = container.querySelector('.encryptor-copy-encrypted-btn');
    
    if (encryptBtn) {
        encryptBtn.addEventListener('click', () => {
            const plaintext = container.querySelector('.encryptor-plaintext').value;
            const password = container.querySelector('.encryptor-encrypt-password').value;
            
            if (!plaintext.trim()) {
                return;
            }
            
            if (!password.trim()) {
                return;
            }
            
            try {
                const encrypted = CryptoJS.AES.encrypt(plaintext, password).toString();
                const outputBox = container.querySelector('[data-tab="encrypt"] .encryptor-output-box');
                container.querySelector('.encryptor-encrypted-text').textContent = encrypted;
                outputBox.classList.add('show');
            } catch (error) {
                console.err('Encryption failed: ' + error.message);
            }
        });
    }
    
    setupCopyButton(copyEncryptedBtn, () => {
        return container.querySelector('.encryptor-encrypted-text').textContent;
    });
    
    // Decrypt
    const decryptBtn = container.querySelector('.encryptor-decrypt-btn');
    const copyDecryptedBtn = container.querySelector('.encryptor-copy-decrypted-btn');
    
    if (decryptBtn) {
        decryptBtn.addEventListener('click', () => {
            const ciphertext = container.querySelector('.encryptor-ciphertext').value;
            const password = container.querySelector('.encryptor-decrypt-password').value;
            
            if (!ciphertext.trim()) {
                return;
            }
            
            if (!password.trim()) {
                return;
            }
            
            try {
                const decrypted = CryptoJS.AES.decrypt(ciphertext, password).toString(CryptoJS.enc.Utf8);
                
                if (!decrypted) {
                    alert('Decryption failed. Wrong password or text.');
                    return;
                }
                
                const outputBox = container.querySelector('[data-tab="decrypt"] .encryptor-output-box');
                container.querySelector('.encryptor-decrypted-text').textContent = decrypted;
                outputBox.classList.add('show');
            } catch (error) {
                console.err('Decryption failed: ' + error.message);
            }
        });
    }
    
    setupCopyButton(copyDecryptedBtn, () => {
        return container.querySelector('.encryptor-decrypted-text').textContent;
    });
}


document.addEventListener('DOMContentLoaded', () => {
    templateManager();
});

document.addEventListener('DOMContentLoaded', () => {
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

    // Display
    // Create the display area for template
    const displayArea = document.createElement('div');
    displayArea.className = 'tools';
    document.querySelector('main').appendChild(displayArea);

    document.querySelectorAll('.horizontal-select button').forEach(btn => {
        // Show template with same id as the button id
        btn.addEventListener('click', () => {
            const tmpl = document.querySelector(`template#${btn.id}`);
            if (!tmpl) return;

            displayArea.innerHTML = '';
            const clone = tmpl.content.cloneNode(true);
            displayArea.appendChild(clone);

            // Generate a password upon pressing #gen-password
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
        });
    });
});

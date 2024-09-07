document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberMeCheckbox = document.getElementById('rememberMe');
    const logoutButton = document.getElementById('logoutButton');

    const savedUsername = getCookie('username');
    const savedEmail = getCookie('email');
    const savedPassword = getCookie('password');
    const rememberMe = getCookie('rememberMe');

    if (savedUsername && savedEmail && savedPassword && rememberMe === 'true') {
        window.location.href = "/shop";
    }

    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        const formTitle = document.getElementById('formTitle').textContent;

        if (formTitle === 'Login') {
            const response = await fetch('accounts.json');
            const accounts = await response.json();

            const account = accounts.find(acc => acc.email === email && acc.password === password);

            if (account) {
                if (rememberMeCheckbox.checked) {
                    setCookie('username', account.username, 365);
                    setCookie('email', account.email, 365);
                    setCookie('password', account.password, 365);
                    setCookie('rememberMe', 'true', 365);
                } else {
                    eraseCookie('username');
                    eraseCookie('email');
                    eraseCookie('password');
                    eraseCookie('rememberMe');
                }

                window.location.href = "/shop";
            } else {
                alert('Invalid email or password.');
            }
        }
    });

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            eraseCookie('username');
            eraseCookie('email');
            eraseCookie('password');
            eraseCookie('rememberMe');
            eraseCookie('id');
            eraseCookie('avatar');
            eraseCookie('username');
            eraseCookie('displayName');
            eraseCookie('code');
            window.location.href = "/";
        });
    }

    // جزء المصادقة مع Discord
    document.getElementById('discordButton').addEventListener('click', function() {
        window.location.href = 'https://discord.com/oauth2/authorize?client_id=1281168143720644670&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000&scope=identify+email';
    });

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
        fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: '1281168143720644670',
                client_secret: '6wDhSRNxrnkfv2myJ-eisS5aymX9ehyR', // ضع هنا الـ client secret الخاص بتطبيقك
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: 'http://localhost:3000'
            })
        })
        .then(response => response.json())
        .then(tokenData => {
            return fetch('https://discord.com/api/v10/users/@me', {
                headers: {
                    'Authorization': `${tokenData.token_type} ${tokenData.access_token}`,
                },
            });
        })
        .then(response => response.json())
        .then(userData => {
            setCookie('id', userData.id, 365);
            setCookie('avatar', `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`, 365);
            setCookie('email', userData.email, 365);
            setCookie('username', `${userData.username}`, 365);
            setCookie('displayName', userData.global_name || userData.username, 365);
            setCookie('code', code, 365);

            window.location.href = "/shop";
        })
        .catch(err => {
            console.error('Error during Discord OAuth process:', err);
        });
    }

    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = `${name}=${value}; ${expires}; path=/`;
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i].trim();
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    }

    function eraseCookie(name) {
        document.cookie = `${name}=; Max-Age=-99999999; path=/`;
    }
});

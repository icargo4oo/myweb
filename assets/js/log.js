document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const usernameInput = document.getElementById('username');
      const userId = getCookie('id');
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
  

    if (userId) {
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
            eraseCookie('displayName');
            eraseCookie('code');
            window.location.href = "/";
        });
    }

    document.getElementById('discordButton').addEventListener('click', function() {
        window.location.href = 'https://discord.com/oauth2/authorize?client_id=1281168143720644670&response_type=code&redirect_uri=https%3A%2F%2Finfiniteservices.glitch.me%2F&scope=identify+email';
    });

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
        fetch('https://infiniteservices.glitch.me/exchange-code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code: code })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setCookie('id', data.id, 365);
                setCookie('avatar', data.avatar, 365);
                setCookie('email', data.email, 365);
                setCookie('username', data.discordUsername, 365);
                setCookie('displayName', data.displayName, 365);
                setCookie('code', code, 365);

                window.location.href = "/shop";
            } else {
                console.error('Error during Discord OAuth process:', data.error);
            }
        })
        .catch(err => {
            console.error('Error during the fetch process:', err);
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

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = urlParams.get('access_token');

    if (accessToken) {
        fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data) {
                setCookie('id', data.sub, 365);
                setCookie('avatar', data.picture, 365);
                setCookie('email', data.email, 365);
                setCookie('username', data.name, 365);
                setCookie('displayName', data.name, 365);
                setCookie('code', accessToken, 365);

                window.location.href = "/shop";
            } else {
                console.error('Error fetching user data:', data);
            }
        })
        .catch(err => {
            console.error('Error during the fetch process:', err);
        });
    }

    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = `${name}=${value}; ${expires}; path=/`;
    }
});

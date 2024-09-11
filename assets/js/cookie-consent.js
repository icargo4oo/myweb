document.addEventListener('DOMContentLoaded', () => {
    const cookieConsentBanner = document.getElementById('cookieConsentBanner');
    const acceptCookiesButton = document.getElementById('acceptCookiesButton');

    // Check if cookies are already accepted
    if (!getCookie('cookiesAccepted')) {
        cookieConsentBanner.style.display = 'block';
    }

    // Handle acceptance of cookies
    acceptCookiesButton.addEventListener('click', () => {
        setCookie('cookiesAccepted', 'true', 365);
        cookieConsentBanner.style.display = 'none';
    });

    // Cookie helper functions
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
});

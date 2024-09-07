document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logoutButton');

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

    // دالة لحذف الكوكيز
    function eraseCookie(name) {
        document.cookie = `${name}=; Max-Age=-99999999; path=/`;
    }
});

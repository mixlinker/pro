const USER_COOKIE_KEY = 'user';
const LOGIN_STATE_KEY = 'loginState';

export default {
    setUser(user) {
        if (!user || user === 'null' || user === null || user === 'undefined') {
            this.clearUser();
            return;
        }
        user = JSON.stringify(user);
        localStorage.setItem(USER_COOKIE_KEY, user);
        localStorage.setItem(LOGIN_STATE_KEY, 1);
    },
    getUser() {
        let user = localStorage.getItem(USER_COOKIE_KEY);
        if (!user || user === 'null' || user === null || user === 'undefined') return null;
        return JSON.parse(user);
    },
    loginState() {
        return localStorage.getItem(LOGIN_STATE_KEY);
    },
    clearUser() {
        localStorage.removeItem(USER_COOKIE_KEY);
        localStorage.removeItem(LOGIN_STATE_KEY);
    }
}

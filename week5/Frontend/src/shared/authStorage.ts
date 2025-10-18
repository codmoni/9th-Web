export const authStorage = {
    getAccessToken: () => {
        const token = localStorage.getItem('accessToken');

        console.log("authStorage - getAccessToken:", token);
        console.log("authStorage - typeof token:", typeof token);
        
        if (!token || token === 'undefined' || token === 'null') return null;
        return token;
    },
    setAccessToken: (token: string | null | undefined) => {
        if (typeof token === 'string' && token.trim() !== '') {
            localStorage.setItem('accessToken', token);
        } 
        else {
            localStorage.removeItem('accessToken');
        }
    },
    isAuthenticated: (): boolean => {
        const token = authStorage.getAccessToken();
        return !!token;
    },
    logout: () => {
        authStorage.setAccessToken(null);
        window.location.href = '/login';
    }
}
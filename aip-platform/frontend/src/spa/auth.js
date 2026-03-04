export const isAuthenticated = () => localStorage.getItem('aip_auth') === '1';
export const login = () => localStorage.setItem('aip_auth', '1');
export const logout = () => localStorage.removeItem('aip_auth');

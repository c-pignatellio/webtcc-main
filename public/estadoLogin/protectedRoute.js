import { ClienteService } from './clienteService.js';

export class ProtectedRoute {
    static async checkAuth(redirectToLogin = true) {
        try {
            const isAuthenticated = await ClienteService.verificarAutenticacao();
            
            if (!isAuthenticated && redirectToLogin) {
                window.location.href = '../../view/login/login.html';
                return false;
            }
            
            return isAuthenticated;
        } catch (error) {
            if (redirectToLogin) {
                window.location.href = '../../view/login/login.html';
            }
            return false;
        }
    }

    static init() {
        this.checkAuth();
    }
}
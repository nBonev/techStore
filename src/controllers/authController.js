import { Router } from "express";
import authService from "../services/authService.js";
import { AUTH_COOKIE_NAME } from "../config.js";

const authController = Router();

authController.get('/login', (req, res) => {
    res.render('auth/login');
});

authController.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const token = await authService.login(email, password);

    res.cookie(AUTH_COOKIE_NAME, token);

    res.redirect('/');
});

authController.get('/register', (req, res) => {
    res.render('auth/register');
});

authController.post('/register', async (req, res) => {
    const userData = req.body;
    
    const token = await authService.register(userData);

    res.cookie(AUTH_COOKIE_NAME, token);

    res.redirect('/');
    
});


export default authController;
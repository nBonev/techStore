import { Router } from "express";
import authService from "../services/authService.js";
import { AUTH_COOKIE_NAME } from "../config.js";
import { isAuth, isGuest } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const authController = Router();

authController.get('/login', isGuest, (req, res) => {
    res.render('auth/login', {pageTitle: 'TechStore | Login'});
});

authController.post('/login', isGuest, async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.login(email, password);

        res.cookie(AUTH_COOKIE_NAME, token, {httpOnly: true});
        res.redirect('/');
    }catch(err) {
        const error = getErrorMessage(err);
        res.render('auth/login', { error, user: { email } });
    }
    
});

authController.get('/register', isGuest, (req, res) => {
    res.render('auth/register', {pageTitle: 'TechStore | Register'});
});

authController.post('/register', isGuest, async (req, res) => {
    const userData = req.body;
    
    try {
        const token = await authService.register(userData);

        res.cookie(AUTH_COOKIE_NAME, token, {httpOnly: true});
        res.redirect('/');
    }catch(err) {
        const error = getErrorMessage(err);
        res.render('auth/register', { error, user: userData });
    }
    
});

authController.get('/logout', isAuth, (req, res) => {
    res.clearCookie(AUTH_COOKIE_NAME);
    res.redirect('/');
});

export default authController;
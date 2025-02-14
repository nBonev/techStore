import { Router } from "express";
import deviceService from "../services/deviceService.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const homeController = Router();

homeController.get('/', async (req, res) => {
    const latestDevices = await deviceService.getLatest();

    res.render('home', { 
        pageTitle: 'TechStore | Home', 
        devices: latestDevices, 
    });
});

homeController.get('/about', (req, res) => {
    res.render('about');
});

homeController.get('/profile', isAuth, async (req, res) => {
    res.render('profile');
});

export default homeController;
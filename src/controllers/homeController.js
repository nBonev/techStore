import { Router } from "express";
import deviceService from "../services/deviceService.js";

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

export default homeController;
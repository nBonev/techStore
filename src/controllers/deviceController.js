import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import deviceService from "../services/deviceService.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const deviceController = Router();

deviceController.get('/', async (req, res) => {
    const devices = await deviceService.getAll();

    res.render('devices/catalog', { devices });
});

deviceController.get('/create', (req, res) => {
    res.render('devices/create');
});

deviceController.post('/create', isAuth, async (req, res) => {
    const deviceData = req.body;
    const userId = req.user.id;

    try {
        await deviceService.create(deviceData, userId);

        res.redirect('/devices');
    }catch(err) {
        res.render('devices/create', {
            error: getErrorMessage(err), 
            device: deviceData, 
        });
    }
    

});

deviceController.get('/:deviceId/details', async (req, res) => {
    const deviceId = req.params.deviceId;
    const device = await deviceService.getOne(deviceId);

    res.render('devices/details', { device });
});

export default deviceController;
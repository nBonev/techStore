import { Router } from "express";

const routes = Router();

routes.get('/', (req, res) => {
    res.send('It works!');
});

export default routes;
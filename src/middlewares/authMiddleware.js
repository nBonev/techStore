import jwt from 'jsonwebtoken';
import { AUTH_COOKIE_NAME, JWT_SECRET } from "../config.js";

export const auth = (req, res, next) => {
    const token = req.cookies[AUTH_COOKIE_NAME];

    if(!token) {
        return next();
    }

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        req.user = decodedToken;
        res.locals.user = decodedToken;

        next();
    }catch(err) {
        res.clearCookie(AUTH_COOKIE_NAME);
        res.redirect('/auth/login');
    }
    
};
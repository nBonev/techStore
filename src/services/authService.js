import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { JWT_SECRET } from '../config.js';

export const register = async (userData) => {
    if(userData.password !== userData.confirmPassword) {
        throw new Error('Password mismatch!');
    }

    const user = await User.findOne({ email: userData.email }).select({ _id: true });
    if(user) {
        throw new Error('User already exists!');
    }

    return User.create(userData); 
};

export const login = async (email, password) => {

    const user = await User.findOne({ email });
    if(!user) {
        throw new Error('Invalid user on email!');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if(!isValid) {
        throw new Error('Invalid user on email!');
    }

    const payload = {
        id: user.id,
        email: user.email,
        username: user.username,
    };

    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '2h'});

    return token;
};

const authService = {
    register,
    login
};

export default authService;
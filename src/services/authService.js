import User from '../models/User.js';

const register = (userData) => {
    User.create(userData); 
};

const authService = {
    register
};

export default authService;
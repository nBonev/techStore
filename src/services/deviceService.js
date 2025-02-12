import Device from "../models/Device.js";

export const create = async (deviceData, userId) => Device.create({ ...deviceData, owner: userId });

const deviceService = {
    create,
};

export default deviceService;
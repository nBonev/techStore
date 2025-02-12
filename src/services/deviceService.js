import Device from "../models/Device.js";

export const create = async (deviceData) => Device.create(deviceData);

const deviceService = {
    create,
};

export default deviceService;
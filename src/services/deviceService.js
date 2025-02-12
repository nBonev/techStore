import Device from "../models/Device.js";

export const getLatest = () => Device.find({}).sort({ _id: 'desc' }).limit(3);
//export const getLatest = () => Device.find({}).sort({ createdAt: 'desc' }).limit(3);

export const create = async (deviceData, userId) => Device.create({ ...deviceData, owner: userId });

const deviceService = {
    create,
    getLatest,
};

export default deviceService;
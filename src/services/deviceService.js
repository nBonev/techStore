import Device from "../models/Device.js";

export const getAll = () => Device.find({});

export const getLatest = () => Device.find({}).sort({ _id: 'desc' }).limit(3);
//export const getLatest = () => Device.find({}).sort({ createdAt: 'desc' }).limit(3);

export const getOne = (deviceId) => Device.findById(deviceId);

export const create = async (deviceData, userId) => Device.create({ ...deviceData, owner: userId });

const deviceService = {
    create,
    getLatest,
    getOne,
    getAll,
};

export default deviceService;
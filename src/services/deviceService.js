import Device from "../models/Device.js";

export const getAll = () => Device.find({});

export const getLatest = () => Device.find({}).sort({ _id: 'desc' }).limit(3);
//export const getLatest = () => Device.find({}).sort({ createdAt: 'desc' }).limit(3);

export const getOne = (deviceId) => Device.findById(deviceId);

export const create = async (deviceData, userId) => Device.create({ ...deviceData, owner: userId });

export const prefer = async (deviceId, userId) => {
    const device = await Device.findById(deviceId);

    if(device.owner.equals(userId)) {
        throw new Error('Cannot prefer own offer!');
    }

    if(device.preferredList.includes(userId)) {
        throw new Error('You already preferred this offer!');
    }

    device.preferredList.push(userId);

    return device.save();
}

export const remove = async (deviceId, userId) => {
    const device = await getOne(deviceId);

    if(!device.owner.equals(userId)) {
        throw new Error('Only owner can delete this offer!');
    }

    return Device.findByIdAndDelete(deviceId);
}

export const update = async (deviceId, userId, deviceData) => {
    const device = await getOne(deviceId);

    if(!device.owner.equals(userId)) {
        throw new Error('Only owner can edit this offer!');
    }

    return Device.findByIdAndUpdate(deviceId, deviceData);
}


const deviceService = {
    create,
    getLatest,
    getOne,
    getAll,
    prefer,
    remove,
    update,
};

export default deviceService;
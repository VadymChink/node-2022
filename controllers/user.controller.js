const fileService = require('../services/file.service');

const getAllUsers = async (req, res) => {
    const users = await fileService.reader();
    res.json(users);
};

const getById = async (req, res) => {
    const users = await fileService.reader();
    const {userId} = req.params;

    const userById = users.find(value => value.id === +userId);

    res.json(userById);
};

const createUser = async (req, res) => {
    const users = await fileService.reader();
    const {name, age} = req.body;

    if (!name || name.length < 3) {
        return res.status(400).json('Enter valid name');
    }
    if (!age || !Number.isInteger(age) || age < 18) {
        return res.status(400).json('Enter valid age');
    }

    const newUser = {...req.body, id: users.length ? users[users.length - 1].id + 1 : 1}

    await fileService.writer([...users, newUser])

    res.status(201).json(newUser);
};

const deleteById = async (req, res) => {
    const users = await fileService.reader();
    const {userId} = req.params;

    const index = users.findIndex(value => value.id === +userId);

    if (index === -1) {
        return res.status(404).json(`User with id ${userId} not found`)
    }

    users.splice(index, 1);
    await fileService.writer(users);

    res.status(204).end()
};

const updateById = async (req, res) => {
    const users = await fileService.reader();
    const {name, age} = req.body;
    const {userId} = req.params;

    if (name && name.length < 3) {
        return res.status(400).json('Enter valid name');
    }
    if (!Number.isInteger(age) || age < 18) {
        return res.status(400).json('Enter valid age');
    }

    const index = users.findIndex(value => value.id === +userId);

    if (index === -1) {
        return res.status(404).json(`User with is ${userId} not found`);
    }

    const updatedUser = Object.assign(users[index], req.body);

    users.splice(index,1);

    await fileService.writer([...users,updatedUser])

    res.status(201).json(updatedUser);
};

module.exports = {
    getAllUsers,
    getById,
    createUser,
    deleteById,
    updateById,
}
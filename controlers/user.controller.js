const {fileService} = require('.././services');

const getAllUsers = async (req, res) => {
    try {
        const users = await fileService.reader();

        res.json(users);
    } catch (e) {
        res.status(400).json(e.message || 'Unknown Error');
    }
}

const createUser = async (req, res) => {
    try {
        const users = await fileService.reader();
        const {name, age} = req.body;

        if (!name || name.length < 3) {
            return res.status(400).json('Enter valid name')
        }
        if (!Number.isInteger(age) || age < 18) {
            return res.status(400).json('Enter valid age')
        }

        const newUser = {...req.body, id: users.length ? users[users.length - 1].id + 1 : 1}
        await fileService.writer([...users, newUser])

        res.status(201).json(`User ${newUser.name} was created`)
    } catch (e) {
        res.status(400).json(e.message || 'Unknown Error');
    }
}

const deleteUserById = async (req, res) => {
    try {
        const users = await fileService.reader();
        const {userId} = req.params;

        const index = users.findIndex((user) => user.id === +userId);

        if (index === -1) {
            return res.status(400).json(`User with ${userId} not found`)
        }

        users.splice(index, 1);

        await fileService.writer(users);

        res.status(204).end();
    } catch (e) {
        res.status(400).json(e.message || 'Unknown Error');
    }

}

const updateUserById = async (req, res) => {
    try {
        const users = await fileService.reader();
        const {name, age} = req.body;
        const {userId} = req.params;

        if (name && name.length < 3) {
            return res.status(400).json('Enter valid name')
        }
        if (!Number.isInteger(age) || age < 18) {
            return res.status(400).json('Enter valid age')
        }

        const index = users.findIndex((user) => user.id === +userId);
        if (index === -1) {
            return res.status(400).json(`User with ${userId} not found`)
        }

        const newUser = Object.assign(users[index], req.body);
        users.splice(index, 1);

        await fileService.writer([...users, newUser])

        res.status(201).json(newUser)
    } catch (e) {
        res.status(400).json(e.message || 'Unknown Error');
    }

}

module.exports = {
    getAllUsers,
    createUser,
    deleteUserById,
    updateUserById,
}
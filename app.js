const express = require('express');
const fileService = require('./services/file.service');

const app = express();
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.get('/users', async (req, res) => {
    const users = await fileService.reader();
    res.json(users)
})

app.get('/users/:userId', async (req, res) => {
    const {userId} = req.params;
    const users = await fileService.reader();

    const user = users.find((value) => value.id === +userId);
    if (!user) {
        return res.status(400).json(`User with id ${userId} not found`)
    }
    res.json(user)
})

app.delete('/users/:userId', async (req, res) => {
    const {userId} = req.params;
    const users = await fileService.reader();

    const index = users.findIndex((value) => value.id === +userId);
    if (index === -1) {
        return res.status(400).json(`user with id ${userId} not found`)
    }

    users.splice(index, 1);

    await fileService.writer(users)

    res.sendStatus(204);
})

app.post('/users', async (req, res) => {
    const {name, age} = req.body;

    if (!name || name.length < 3) {
        return res.status(400).json('Enter valid name')
    }
    if (!Number.isInteger(age) || age < 18) {
        return res.status(400).json('Enter valid age')
    }

    const users = await fileService.reader();

    const newUser = {...req.body, id: users.length ? users[users.length - 1].id + 1 : 1}

    await fileService.writer([...users, newUser])

    res.json(newUser)
})

app.put('/users/:userId', async (req, res) => {
    const {userId} = req.params;
    const {name, age} = req.body;

    if (name && name.length < 3) {
        return res.status(400).json('Enter valid name');
    }
    if (age && !Number.isInteger(age) || age < 18) {
        return res.status(400).json('Enter valid age');
    }

    const users = await fileService.reader();

    const index = users.findIndex((user) => user.id === +userId);

    if (index === -1) {
        return res.status(400).json(`User with id ${userId} not found`);
    }

    const updateUser = Object.assign(users[index], req.body);

    users.splice(index,1);

    await fileService.writer([...users,updateUser]);

    res.status(201).json(updateUser);
})

app.listen(5000, () => {
    console.log('Server listen 5000')
})
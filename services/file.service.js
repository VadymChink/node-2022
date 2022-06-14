const fs = require('fs/promises');
const path = require("path");

const pathDB = path.join(process.cwd(), 'db', 'users.json');

module.exports = {
    reader: async () => {
        const data = await fs.readFile(pathDB);
        return data.toString() ? JSON.parse(data.toString()).sort((a, b) => a.id - b.id) : []
    },
    writer: async (users) => {
        await fs.writeFile(pathDB, JSON.stringify(users));
    },
}
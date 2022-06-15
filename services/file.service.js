const fs = require('fs/promises');
const path = require('path');

const pathDB = path.join(process.cwd(), 'db', 'users.json');

module.exports = {
    reader: async () => {
        const buffer = await fs.readFile(pathDB);
        return buffer.toString() ? JSON.parse(buffer.toString()).sort((a, b) => a.id - b.id) : [];

    },
    writer: async (users) => {
        await fs.writeFile(pathDB, JSON.stringify(users))
    },
}
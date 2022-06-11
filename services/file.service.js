const fs = require('fs/promises');
const path = require('path');

const pathDB = path.join(process.cwd(), 'db', 'users.json');

module.exports = {
    reader: async () => {
        try {
            const data = await fs.readFile(pathDB);
            return data ? JSON.parse(data.toString()).sort((a, b) => a.id - b.id) : [];
        } catch (e) {
            console.error(e)
        }
    },
    writer: async (users) => {
        try {
            await fs.writeFile(pathDB, JSON.stringify(users))
        } catch (e) {
            console.error(e)
        }
    },
}
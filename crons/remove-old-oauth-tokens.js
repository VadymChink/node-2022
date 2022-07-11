const dayjs = require('dayjs');

const {OAuth} = require('../db');

module.exports = async () => {
    const sevenDaysBeforeNow = dayjs().subtract(7, 'days')

    const query = await OAuth.deleteMany({
        createAt: {$lte: sevenDaysBeforeNow}
    });

    console.log(query)
}



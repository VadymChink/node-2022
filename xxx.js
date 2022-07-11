const dayjs = require('dayjs')

const sevenDaysBeforeNow = dayjs().subtract(1, 'months')

console.log(sevenDaysBeforeNow.toString())




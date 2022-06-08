const {createUser} = require('./services/user.service');
require('./services/file.service');

const user = createUser('Vadym', 27);

user.seyHello();
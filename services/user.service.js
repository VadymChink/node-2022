const {User} = require('../db');

module.exports = {
    findAllUsersWithPagination: async (query = {}) => {
        const {page = 1, perPage = 5, ...otherFilters} = query;

        const skip = (page - 1) * perPage;

        const searchObject = {};

        if (otherFilters.search) {
            Object.assign(searchObject, {
                $or: [
                    {name: {$regex: otherFilters.search, $options: 'i'}},
                    {email: {$regex: otherFilters.search, $options: 'i'}}
                ]

            })
        }

        if (otherFilters.ageGTE) {
            Object.assign(searchObject, {
                age: {$gte: +otherFilters.ageGTE}
            })
        }
        if (otherFilters.ageLTE) {
            Object.assign(searchObject, {
                age: {...searchObject.age || {}, $lte: +otherFilters.ageLTE}
            })
        }

        const users = await User.find(searchObject).skip(skip).limit(perPage);
        const userCount = await User.countDocuments(searchObject);

        return {
            page,
            perPage,
            data: users,
            count: userCount,
        };
    },
    findUser: (params) => {
        return User.findOne(params);
    },
    createUser: (user) => {
        return User.create(user);
    },
    updateUser: (params, data, options = {new: true}) => {
        return User.findByIdAndUpdate(params, data, options);
    },
    deleteUser: (params) => {
        return User.deleteOne(params);
    },

}
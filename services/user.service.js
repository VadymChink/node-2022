function createUser(name, age) {
    return {
        name,
        age,
        seyHello: () => {
            console.log(`Hello! My name is${name} and I am ${age} year old`);
        }
    }
}

module.exports = {
   createUser
}

//module.exports.age = 26;

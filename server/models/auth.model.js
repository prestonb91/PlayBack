const prisma = require("../src/prisma");

class Auth {
    constructor() {}

    static getUserInfo(username) {
        return prisma.users.findFirst({
            where: ({ username: username }),
            select: ({ id: true, username: true, password: true})
        })
    }

    static addNewUser(newUsername, hashedPassword) {
        return prisma.users.create({
            data: {
                username: newUsername,
                password: hashedPassword,
            },
        })
    }

    static newUserId(newUsername, hashedPassword) {
        return prisma.users.findFirst({
            where: { username: newUsername, password: hashedPassword},
            select: { id: true}
        })
    }

    
}

module.exports = Auth;
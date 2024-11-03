const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    const user1 = await prisma.users.upsert({
        where : { id: 1},
        update: {},
        create: {
            username: "User1",
            password: "pass1",
        }
    })

    const user2 = await prisma.users.upsert({
        where : { id: 2},
        update: {},
        create: {
            username: "User2",
            password: "pass2"
        }
    })

    const user3 = await prisma.users.upsert({
        where : { id: 3},
        update: {},
        create: {
            username: "User3",
            password: "pass3"
        }
    })

    const gameCard1 = await prisma.game_cards.upsert({
        where : { id: 1},
        update: {},
        create: {
            user_id: 1,
            name: "The Witcher 3: Wild Hunt",
            rating: 0,
            review: "",
            console: "",
            reference_url: "",
        }
    })

    const gameCard2 = await prisma.game_cards.upsert({
        where : { id: 2},
        update: {},
        create: {
            user_id: 1,
            name: "God of War: Ragnarok",
            rating: 0,
            review: "",
            console: "",
            reference_url: "",
        }
    })

    const gameCard3 = await prisma.game_cards.upsert({
        where : { id: 3},
        update: {},
        create: {
            user_id: 2,
            name: "Apex Legends",
            rating: 0,
            review: "",
            console: "",
            reference_url: "",
        }
    })

    const gameCard4 = await prisma.game_cards.upsert({
        where : { id: 4},
        update: {},
        create: {
            user_id: 3,
            name: "Persona 5",
            rating: 0,
            review: "",
            console: "",
            reference_url: "",
        }
    })
    console.log(user1, gameCard1, gameCard2)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
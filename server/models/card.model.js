const prisma = require("../src/prisma");

class Cards {
    constructor() {}

    static getCards(userId) {
        return prisma.game_cards.findMany({
            where: {
                user_id: userId,
            },
            select: {
                id: true,
                name: true,
                rating: true,
                completion_status: true,
                review: true,
                console: true,
                reference_url: true
            }
        })
    }

    static addCard(userId, formData) {
        return prisma.game_cards.create({
            data: {
                user_id: userId,
                name: formData.name, 
                rating: parseInt(formData.rating),
                completion_status: formData.completion_status,
                console: "",
                review: formData.review,
                reference_url: formData.reference_url
            }
        })
    }

    static editCard(cardId, formData) {
        return prisma.game_cards.update({
            where: {
                id: cardId,
            },
            data: {
                name: formData.name,
                rating: parseInt(formData.rating),
                completion_status: formData.completion_status,
                review: formData.review,
                reference_url: formData.reference_url
            }
        })
    }

    static deleteCard(cardId) {
        return prisma.game_cards.delete({
            where: { id: cardId }
        })
    }
}

module.exports = Cards;
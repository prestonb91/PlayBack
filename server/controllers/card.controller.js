const cardModel = require ("../models/card.model")

//TODO: Add error handling

const getUserData = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const cardData = await cardModel.getCards(userId);
        return res.json(cardData);
    } catch(err) {  
        console.error(err);
    }
};

const addCard = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const formData = req.body.formData;
        const addCard = await cardModel.addCard(userId, formData)
    } catch(err) {
        console.error(err);
    }
}

const editCard = async (req, res) => {
    try {
        const cardId = parseInt(req.params.cardId);
        const formData = req.body.editFormData;
        const editCard = await cardModel.editCard(cardId, formData);
    } catch(err) {
        console.error(err);
    }
}

const deleteCard = async (req, res) => {
    try {
        const cardId = parseInt(req.params.cardId);
        const deleteCard = await cardModel.deleteCard(cardId);
    } catch(err) { 
        console.error(err);
    }
}

module.exports = { getUserData, addCard, editCard, deleteCard }
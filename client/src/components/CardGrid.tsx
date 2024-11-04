import { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

interface Props {
    userId: any,
}

const initialValues = {
    name: "",
    rating: 0, 
    completion_status: false, 
    review: "",
    reference_url: ""
}

const CardGrid: React.FC<Props> = ({ userId }) => {
    const [cardGrid, setCardGrid] = useState<any>([]);
    const [cardId, setCardId] = useState<any>();
    const [editMenuView, setEditMenu] = useState<any>(false);
    const [editFormData, setEditFormData] = useState<any>(initialValues);

      // handle fetching all card data based on userId
    const fetchCards = async (userId : any) => {
        try {
            const response = await axios.get(`${apiUrl}/users/${userId}`, 
            { withCredentials: true});

            setCardGrid(response.data); 
 
        } catch (err) { 
            console.error("Card fetch error: ", err)
        }
    }

    const handleEditView = (cardId : any) => {
        setEditMenu(true);
        setCardId(cardId);
    }

    const handleInputChange = (e : any) => {
        const { name, value } = e.target;

        setEditFormData({
            ...editFormData,
            [name]: value,
        })
    }

    const editCard = async (cardId : any) => {
        try {
            const response = await axios.patch(`${apiUrl}/cards/${cardId}`, {
                editFormData
            }, 
            { withCredentials: true});
        } catch (err) {
              console.error("Create module error ", err)
            }

    }

    const exitEditMenuView = () => {
        setEditMenu(false);
    }

    const deleteCard = async (cardId : any) => {
        try {
            const response = await axios.delete(`${apiUrl}/cards/${cardId}`,
            { withCredentials: true});
        } catch(err) {
            console.error("Card delete error: ", err)
        }
    }

    useEffect(() => {
        fetchCards(userId)
    }, [deleteCard, editCard])

    return (

        <>
            {!editMenuView ? (
            <div>
                {cardGrid.map((item : any, index : any) => {
                    return (
                        <div
                            key={index}
                        >
                            <p>Name: {item.name}</p>
                            <p>Rating: {item.rating}</p>
                            <p>Status: {item.completion_status}</p>
                            <p>Review: {item.review}</p>
                            <p>Url: {item.reference_url}</p>
                            <button
                                type="button"
                                onClick={()=>handleEditView(item.id)}
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                onClick={()=>deleteCard(item.id)}
                            >
                                Delete
                            </button>
                        </div>
                    ) 
                })}
            </div>
            ) : (
                <form>
                    <label>Name</label>
                    <input
                        type="text"
                        name={"name"}
                        value={editFormData.name}
                        onChange={handleInputChange}
                    >
                    </input>
                <label>Rating</label>
                    <input
                        type="number"
                        name={"rating"}
                        value={editFormData.rating}
                        onChange={handleInputChange}
                    >
                    </input>
                {/* TODO implement boolean */}
                <label>Status</label>
                    <input
                        type="checkbox"
                        name={"completion_status"}
                        value={editFormData.completion_status}
                        onChange={handleInputChange}
                    >
                    </input>
                <label>Review</label>
                    <input
                        type="text"
                        name={"review"}
                        value={editFormData.review}
                        onChange={handleInputChange}
                    >
                    </input>
                <label>Link</label>
                    <input
                        type="text"
                        name={"reference_url"}
                        value={editFormData.reference_url}
                        onChange={handleInputChange}
                    >
                    </input>
                <button
                    type="button"
                    onClick={()=>editCard(cardId)}
                >
                    Save
                </button>
                <button
                    type="button"
                    onClick={exitEditMenuView}
                >
                    Exit
                </button>
                </form>
            )}
        </>

    )

}


export default CardGrid;
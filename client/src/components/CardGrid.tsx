import { useState, useEffect } from "react";
import CreateCard from "./CreateCard";
// import CardWidget from "./CardWidget";
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
    const [cardData, setCardData] = useState<any>([]);
    const [cardId, setCardId] = useState<any>();
    const [singleCard, setSingleCard] = useState<any>();
    const [recentReview, setRecentReview] = useState<any>([]);
    const [pageView, setPageView] = useState<any>("homepage");
    const [editFormData, setEditFormData] = useState<any>(initialValues);

    // let totalCounter = cardData.length;
    // let finishedCounter = 0;
    // let completionRate = 0;

      // handle fetching all card data based on userId
    const fetchCards = async (userId : any) => {
        try {
            const response = await axios.get(`${apiUrl}/users/${userId}`, 
            { withCredentials: true});

            const allCards = response.data;
            setCardData(allCards); 
 
        } catch (err) { 
            console.error("Card fetch error: ", err)
        }
    }

    const handlePageView = (cardId : any) => {
        setPageView("viewCard");
        setCardId(cardId);
    }

    const handleEditView = (cardId : any) => {
        setPageView("editCard");
        setCardId(cardId);
        setEditFormData(singleCard);
    }

    const handleInputChange = (e : any) => {

        const value = e.target.type === "checkbox" ? e.target.checked: e.target.value;

        setEditFormData({
            ...editFormData,
            [e.target.name]: value,
        })
        console.log(editFormData)
    }

    const editCard = async (cardId : any) => {
        try {

            const temp = [...cardData]
            const index = temp.indexOf(singleCard)
            
            const update = editFormData;
            setSingleCard(update)
            temp.splice(index, 1, update);
            setCardData(temp)

            const response = await axios.patch(`${apiUrl}/cards/${cardId}`, {
                editFormData
            }, 
            { withCredentials: true});
        } catch (err) {
              console.error("Create card error ", err)
            }
    }

    const exitEditMenuView = () => {
        setPageView("homepage");
    }

    const deleteCard = async (cardId : any) => {
        try {
            const response = await axios.delete(`${apiUrl}/cards/${cardId}`,
            { withCredentials: true});
        } catch(err) {
            console.error("Card delete error: ", err)
        }
    }

    const handleDeleteCard = async (cardId : any, index: number) => {
        const temp = [...cardData]
        temp.splice(index, 1);
        setCardData(temp)
        const deleted = await deleteCard(cardId)
    }
 
    // const fetchGameNews = async(gameName : any) => {
    //     console.log(gameName)

    //     try {
    //         const gameIdResponse = await axios.get(`https://opencritic-api.p.rapidapi.com/game/search?criteria=${gameName}`, {
    //             headers: {
    //                 "X-Rapidapi-Key": "b1cf68ede7msh5d3f6e0ea567059p11cbc6jsn1e51425a161c",
    //                 "X-Rapidapi-Host": "opencritic-api.p.rapidapi.com",
    //             }
    //         })

    //         const gameId = gameIdResponse.data[0].id;
    //         console.log(gameId)

    //         const gameDataResponse = await axios.get(`https://opencritic-api.p.rapidapi.com/review/game/${gameId}?sort=blend&order=desc`, {
    //             headers: {
    //                 "X-Rapidapi-Key": "b1cf68ede7msh5d3f6e0ea567059p11cbc6jsn1e51425a161c",
    //                 "X-Rapidapi-Host": "opencritic-api.p.rapidapi.com",
    //             }
    //         })

    //         console.log(gameDataResponse)
    //         setRecentReview(gameDataResponse.data);
    //         console.log(recentReview)
    //     } catch(err) {
    //         console.error("Game news error: ", err)
    //     }
    // } 

    const checkboxHandler = (status : any) => {
        if (status) {
            return "True"   
        } else {
            return "False"
        }
    }

    // const counter = () => {
        
    //     let totalCounter = cardData.length;

    //     for (let item of cardData) {
    //         if (item.completion_status) {
    //             finishedCounter++;
    //         }
    //     }

    //     completionRate = (finishedCounter / totalCounter) * 100;
    //     console.log(finishedCounter)
    //     console.log(completionRate)
    // }

    useEffect(() => {
        fetchCards(userId)
    },[])
 
    return (

        <>

            {/* include as component */}
            {/* <div>
                <p>Total: {totalCounter}</p>
                <p>Finished: {finishedCounter}</p>
                <p>Completion Rate: {completionRate}%</p>
            </div> */}

            <CreateCard
                userId={userId}
                cardData={cardData}
                setCardData={setCardData}
            />

            {pageView === "homepage" ? (
            <div>

                {cardData.map((item : any, index : any) => {

                    return (
                        <div
                            key={index}
                        >
                            <p>Name: {item.name}</p>
                            <p>Rating: {item.rating}</p>
                            <p>Status: {checkboxHandler(item.completion_status)}</p>
                            <p>Review: {item.review}</p>
                            <p>Url: {item.reference_url}</p>
                            <button
                                type="button"
                                onClick={()=>{
                                    handlePageView(item.id),
                                    // fetchGameNews(item.name),
                                    setSingleCard(item);
                                }}
                            >
                                View
                            </button>
                            <button
                                type="button"
                                onClick={()=>handleDeleteCard(item.id, index)}
                            >
                                Delete
                            </button>
                        </div>
                    ) 
                })}
            </div>
            ) : pageView === "viewCard" ? (
                <>
                <p>Name: {singleCard.name}</p>
                <p>Rating: {singleCard.rating}</p>
                <p>Status: {checkboxHandler(singleCard.completion_status)}</p>
                <p>Review: {singleCard.review}</p>
                <p>Url: {singleCard.reference_url}</p>
                <button
                    type="button"
                    onClick={()=>{
                        handleEditView(singleCard.id)
                    }}
                >
                    Edit
                </button>
                <button
                    type="button"
                    onClick={exitEditMenuView}
                >
                    Exit
                </button>

                <div>
                    <h1>Reviews</h1>
                    {/* <div>
                        <CardWidget 
                            recentReview={recentReview}
                        />
                    </div> */}
                </div>
            </>
            ) : pageView === "editCard" ? (
            <>
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
                        min="1"
                        max="5"
                        value={editFormData.rating}
                        onChange={handleInputChange}
                    >
                    </input>
                <label>Status</label>
                    <input
                        type="checkbox"
                        name={"completion_status"}
                        defaultChecked={editFormData.completion_status}
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
                    onClick={()=>{
                        editCard(cardId),
                        setPageView("viewCard")
                    }}
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

                <div>
                    <h1>Reviews</h1>
                    {/* <div>
                        <CardWidget 
                            recentReview={recentReview}
                        />
                    </div> */}
                </div>
            </>
            ) : (
                null
            )}
        </>

    )

}


export default CardGrid;
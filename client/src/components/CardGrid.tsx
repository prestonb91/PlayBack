import { useState, useEffect } from "react";
import CreateCard from "./CreateCard";
// import CardReviewWidget from "./widgets/CardReviewWidget";
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
    // const [recentReview, setRecentReview] = useState<any>([]);
    const [pageView, setPageView] = useState<any>("homepage");
    const [editFormData, setEditFormData] = useState<any>(initialValues);

    // Fetch all cards based on userId
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

    // Handler function to update setEditFormData with changes
    const handleInputChange = (e : any) => {
        const value = e.target.type === "checkbox" ? e.target.checked: e.target.value;

        setEditFormData({
            ...editFormData,
            [e.target.name]: value,
        })
    }

    const editCard = async (cardId : any) => {
        try {
            const temp = [...cardData]
            const index = temp.indexOf(singleCard)
            
            const update = editFormData;
            setSingleCard(update)
            temp.splice(index, 1, update);
            setCardData(temp)

            await axios.patch(`${apiUrl}/cards/${cardId}`, {
                editFormData
            }, 
            { withCredentials: true});
        } catch (err) {
              console.error("Create card error ", err)
            }
    }

    // Handler function to delete card
    const handleDeleteCard = async (cardId : any, index: number) => {
        const temp = [...cardData]
        temp.splice(index, 1);
        setCardData(temp)

        try {
            await axios.delete(`${apiUrl}/cards/${cardId}`,
            { withCredentials: true});
        } catch(err) {
            console.error("Card delete error: ", err)
        }
    }
 
    // const fetchGameReviews = async(gameName : any) => {
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

    // Helper functions to handle page view switches
    const handlePageView = (cardId : any) => {
        setPageView("viewCard");
        setCardId(cardId);
    }

    const handleEditView = (cardId : any) => {
        setPageView("editCard");
        setCardId(cardId);
        setEditFormData(singleCard);
    }

    // Function to handle star rating
    const starRating = (stars : any) => {
        
        let starRating = "☆☆☆☆☆";

        function replaceChar(str: any, index: any, char: any) {
            const array = str.split(``)
            array[index] = char;
            return array.join(``)
        }

        for (let i = 0; i < stars; i++) {
            starRating = replaceChar(starRating, i, "⭐️");
        }

        starRating = starRating.slice(0,6)
        return starRating;

    }

    // Handler to return value based on completion status
    const checkboxHandler = (status : any) => {
        if (status) {
            return "Finished!"   
        } else {
            return "Uncompleted"
        }
    }

    // Total counter variables
    let totalCounter = cardData.length;
    let finishedCount = 0;
    for (let item of cardData) {
        if (item.completion_status) {
            finishedCount++;
        }
    }

    const completionRate = () => {
        if (totalCounter > 0) {
            return Math.round((finishedCount / totalCounter) * 100);
        } else {
            return 0
        }
     }

    useEffect(() => {
        fetchCards(userId)
    },[])
 
    return (
        <>
            {/* TODO: include as components */}
            <div>
                <div>Total: {totalCounter}</div>
                <div>Finished: {finishedCount}</div>
                <div>Completion Rate: {completionRate()}%</div>
            </div>

            <CreateCard
                userId={userId}
                cardData={cardData}
                setCardData={setCardData}
            />

            {pageView === "homepage" ? (
            <div className="border-2 w-3/5 h-max-screen overflow-y-scroll grid grid-cols-3 gap-3 absolute top-36 left-72">
                {cardData.map((item : any, index : any) => {

                    return (
                        <div
                            className="border-2 p-2 m-1"
                            key={index}
                        >
                            <div>Name: {item.name}</div>
                            <div>Rating: {starRating(item.rating)}</div>
                            <div>Status: {checkboxHandler(item.completion_status)}</div>
                            <div>Review: {item.review}</div>
                            <img
                                src={item.reference_url}
                            />
                            <button
                                className="border-2"
                                type="button"
                                onClick={()=>{
                                    handlePageView(item.id),
                                    // fetchGameReviews(item.name),
                                    setSingleCard(item);
                                }}
                            >
                                View
                            </button>
                            <button
                                className="border-2"
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
                <div>Name: {singleCard.name}</div>
                <div>Rating: {starRating(singleCard.rating)}</div>
                <div>Status: {checkboxHandler(singleCard.completion_status)}</div>
                <div>Review: {singleCard.review}</div>
                <img
                    src={singleCard.reference_url}
                />
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
                    onClick={()=>setPageView("homepage")}
                >
                    Exit
                </button>

                <div>
                    <h1>Reviews</h1>
                    <div>
                        {/* <CardReviewWidget 
                            recentReview={recentReview}
                        /> */}
                    </div>
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
                    <br/>
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
                    <br/>
                    <label>Status</label>
                    <input
                        type="checkbox"
                        name={"completion_status"}
                        defaultChecked={editFormData.completion_status}
                        value={editFormData.completion_status}
                        onChange={handleInputChange}
                    >
                    </input>
                    <br/>
                    <label>Review</label>
                    <input
                        type="text"
                        name={"review"}
                        value={editFormData.review}
                        onChange={handleInputChange}
                    >
                    </input>
                    <br/>
                    <label>Link</label>
                    <input
                        type="text"
                        name={"reference_url"}
                        value={editFormData.reference_url}
                        onChange={handleInputChange}
                    >
                    </input>
                    <br/>
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
                    onClick={()=>{setPageView("viewCard")}}
                >
                    Exit
                </button>
                </form>

                <div>
                    <h1>Reviews</h1>
                    <div>
                        {/* <CardReviewWidget 
                            recentReview={recentReview}
                        /> */}
                    </div>
                </div>
            </>
            ) : (
                null
            )}
        </>

    )

}


export default CardGrid;
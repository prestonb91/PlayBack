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
            <div className="border-2 w-1/5 absolute top-5 p-2">
                <div className="font-bold underline">Completion Status</div>
                <div>Total: {totalCounter}</div>
                <div>Finished: {finishedCount}</div>
                <div>Completion Rate: {completionRate()}%</div>
            </div>

            <div className="border-2 p-2 absolute left-0 top-40 w-1/5 overflow-y-scroll border-dashed border-green-500">
                <CreateCard
                    userId={userId}
                    cardData={cardData}
                    setCardData={setCardData}
                />
            </div>

            {pageView === "homepage" ? (
            <div className="w-7/12 h-max-screen overflow-y-scroll grid grid-cols-3 gap-2 absolute top-96 left-1/2 transform -translate-x-1/2 -translate-y-60">
                {cardData.map((item : any, index : any) => {

                    return (
                        <div
                            className="border-2 border-double border-green-500 p-2 m-1 relative h-96 bg-zinc-800"
                            key={index}
                        >
                            <div className="absolute top-0 left-0 truncate text-base font-bold mb-1 text-center border-2 border-double border-green-500 w-11/12">{item.name}</div>
                                <div className="mt-7">Rating: {starRating(item.rating)}</div>
                                <div>Status: {checkboxHandler(item.completion_status)}</div>
                                <div className="truncate mb-1">Review: {item.review}</div>
                                <div className="flex justify-center">
                                    <img className="h-60"
                                        src={item.reference_url}
                                    />
                                </div>
                            <button
                                className="border-4 w-full absolute bottom-0 left-0 mt-2 bg-gray-300 text-gray-800 border-gray-600"
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
                                className="border-2 w-1/12 h-7 absolute top-0 right-0 bg-gray-300 text-gray-800 border-gray-600"
                                type="button"
                                onClick={()=>handleDeleteCard(item.id, index)}
                                >
                                X
                            </button>
                        </div>
                    ) 
                })}
            </div>
            ) : pageView === "viewCard" ? (
            <div className="border-8 border-green-500 border-double w-5/12 h-max-screen absolute top-96 left-1/2 transform -translate-x-1/2 -translate-y-60 bg-zinc-800">
                <div
                    className="text-center font-bold text-base mt-2 underline"
                >Card Info</div>
                <div className="flex justify-evenly pt-14 pb-5">
                    <div>
                        <div className="m-2">Name: {singleCard.name}</div>
                        <div className="m-2">Rating: {starRating(singleCard.rating)}</div>
                        <div className="m-2">Status: {checkboxHandler(singleCard.completion_status)}</div>
                        <div className="m-2">Review: {singleCard.review}</div>
                    </div>
                    <div>
                        <img className="h-60"
                            src={singleCard.reference_url}
                        />
                    </div>
                </div>
                <button
                    className="border-2 p-1 absolute top-0 right-11 bg-gray-300 text-gray-800 border-gray-600"
                    type="button"
                    onClick={()=>{
                        handleEditView(singleCard.id)
                    }}
                >
                    Edit
                </button>
                <button
                    className="border-2 p-1 absolute top-0 right-0 bg-gray-300 text-gray-800 border-gray-600"
                    type="button"
                    onClick={()=>setPageView("homepage")}
                >
                    Back
                </button>
                <div>
                    <div className="text-center m-2 text-base font-bold mb-1">Reviews</div>
                    <div>
                        {/* TODO set conditional if no reviews return no review text */}
                        {/* <CardReviewWidget 
                            recentReview={recentReview}
                        /> */}
                    </div>
                </div>
            </div>
            ) : pageView === "editCard" ? (
            <div className="border-8 border-double border-green-500 w-5/12 h-1/2 absolute top-96 left-1/2 transform -translate-x-1/2 -translate-y-60 bg-zinc-800">
                <form className="p-2">
                <div
                    className="text-center font-bold text-base mb-5 underline"
                >Edit Your Card</div>
                    <label className="m-2">Name</label>
                    <input
                        className="border-2 m-1 w-10/12 text-black"
                        type="text"
                        name={"name"}
                        value={editFormData.name}
                        onChange={handleInputChange}
                    >
                    </input>
                    <br/>
                    <label className="m-2">Rating</label>
                    <input
                        className="border-2 m-1 text-black"
                        type="number"
                        name={"rating"}
                        min="1"
                        max="5"
                        value={editFormData.rating}
                        onChange={handleInputChange}
                    >
                    </input>
                    <br/>
                    <label className="m-2">Status</label>
                    <input
                        className="border-2 m-1"
                        type="checkbox"
                        name={"completion_status"}
                        defaultChecked={editFormData.completion_status}
                        value={editFormData.completion_status}
                        onChange={handleInputChange}
                    >
                    </input>
                    <br/>
                    <label className="m-2">Review</label>
                    <input
                        className="border-2 w-11/12 m-1 h-28 text-black"
                        type="text"
                        name={"review"}
                        value={editFormData.review}
                        onChange={handleInputChange}
                    >
                    </input>
                    <br/>
                    <label className="m-2">Cover Image Link</label>
                    <br/>
                    <input
                        className="border-2 w-11/12 m-1 text-black"
                        type="text"
                        name={"reference_url"}
                        value={editFormData.reference_url}
                        onChange={handleInputChange}
                    >
                    </input>
                    <br/>
                <button
                    className="border-2 p-1 absolute top-0 right-11 bg-gray-300 text-gray-800 border-gray-600"
                    type="button"
                    onClick={()=>{
                        editCard(cardId),
                        setPageView("viewCard")
                    }}
                >
                    Save
                </button>
                <button
                    className="border-2 p-1 absolute top-0 right-0 bg-gray-300 text-gray-800 border-gray-600"
                    type="button"
                    onClick={()=>{setPageView("viewCard")}}
                >
                    Back
                </button>
                </form>
            </div>
            ) : (
                null
            )}
        </>

    )

}


export default CardGrid;
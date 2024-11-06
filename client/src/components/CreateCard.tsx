import { useState } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

interface Props {
    userId: any;
    cardData: any;
    setCardData: any;
}

const initialValues = {
    name: "",
    rating: 0, 
    completion_status: false, 
    review: "",
    reference_url: ""
}

const CreateCard: React.FC<Props> = ( { userId, cardData, setCardData }) => {
    const [formData, setFormData] = useState<any>(initialValues);

    const handleInputChange = (e : any) => {
        const value = e.target.type === "checkbox" ? e.target.checked: e.target.value;

        setFormData ({
            ...formData,
            [e.target.name]: value,
        })

    }

    const handleSubmit = async (e : any) => {
        e.preventDefault(); 
        //send form data to server
        try {
            
            const temp = [...cardData]
            temp.push(formData)
            setCardData(temp)

            await axios.post(`${apiUrl}/users/${userId}`, {
                formData
            }, 
            { withCredentials: true});

        } catch (err) {
              console.error("Create module error ", err)
            }
    }

    return (
        <>
            <form className="border-2 w-1/5 h-lvh overflow-y-scroll p-2">
                <label className="p-1">Name</label>
                    <input
                        className="border-2 m-1"
                        type="text"
                        name={"name"}
                        value={formData.name}
                        onChange={handleInputChange}
                    >
                    </input>
                    <br/>
                <label className="p-1">Star Rating</label>
                    <input           
                        className="border-2 m-1"           
                        type="number"
                        name={"rating"}
                        min="0"
                        max="5"
                        value={formData.rating}
                        onChange={handleInputChange}
                    >
                    </input>
                    <br/>
                <label className="p-1">Status</label>
                    <input
                        className="border-2 m-1"                    
                        type="checkbox"
                        name={"completion_status"}
                        value={formData.completion_status}
                        onChange={handleInputChange}
                    >
                    </input>
                    <br/>
                <label className="p-1">Review</label>
                    <input
                        className="border-2 h-1/5 m-1"                    
                        type="text"
                        name={"review"}
                        value={formData.review}
                        onChange={handleInputChange}
                    >
                    </input>
                    <br/>
                <label className="p-1">Cover Image Link</label>
                    <input
                        className="border-2 m-1"                    
                        type="text"
                        name={"reference_url"}
                        value={formData.reference_url}
                        onChange={handleInputChange}
                    >
                    </input>
                    <br/>
                <button
                    className="border-2 m-1"
                    type="submit"
                    onClick={handleSubmit}
                >Add Game
                </button>
            </form>
        </>
    )
}

export default CreateCard
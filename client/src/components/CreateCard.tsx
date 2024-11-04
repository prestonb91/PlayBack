import { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

interface Props {
    userId: any;
}

const initialValues = {
    name: "",
    rating: 0, 
    completion_status: false, 
    review: "",
    reference_url: ""
}

const CreateCard: React.FC<Props> = ( { userId }) => {
    const [formData, setFormData] = useState<any>(initialValues);
    // const [check, setCheck] = useState<any>(false);

    const handleInputChange = (e : any) => {
        const { name, value } = e.target;
        // console.log(value)

        setFormData ({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = async (e : any) => {
        e.preventDefault();

        //send form data to server
        try {
            const response = await axios.post(`${apiUrl}/users/${userId}`, {
                formData
            }, 
            { withCredentials: true});
        } catch (err) {
              console.error("Create module error ", err)
            }
    }

    useEffect(() => {
        handleSubmit
    }, [])

    return (
        <>
            <form>
                <label>Name</label>
                    <input
                        type="text"
                        name={"name"}
                        value={formData.name}
                        onChange={handleInputChange}
                    >
                    </input>
                <label>Rating</label>
                    <input
                        type="number"
                        name={"rating"}
                        value={formData.rating}
                        onChange={handleInputChange}
                    >
                    </input>
                {/* TODO implement boolean */}
                <label>Status</label>
                    <input
                        type="checkbox"
                        name={"completion_status"}
                        value={formData.completion_status}
                        onChange={handleInputChange}
                    >
                    </input>
                <label>Review</label>
                    <input
                        type="text"
                        name={"review"}
                        value={formData.review}
                        onChange={handleInputChange}
                    >
                    </input>
                <label>Link</label>
                    <input
                        type="text"
                        name={"reference_url"}
                        value={formData.reference_url}
                        onChange={handleInputChange}
                    >
                    </input>
                <button
                    type="submit"
                    onClick={handleSubmit}
                >Add Game
                </button>
            </form>
        </>
    )
}

export default CreateCard
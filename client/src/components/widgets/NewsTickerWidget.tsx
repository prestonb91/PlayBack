import axios from "axios"
import { useState, useEffect } from "react"

const NewsTickerWidget: React.FC = () => {
    const [recentlyReleased, setRecentlyReleased] = useState<any>([]);
    const [upcomingGames, setUpcomingGames] = useState<any>([]);

    const fetchRecentlyReleased = async() => {

        try {
            const response = await axios.get("https://opencritic-api.p.rapidapi.com/game/recently-released", {
                headers: {
                    "X-Rapidapi-Key": "b1cf68ede7msh5d3f6e0ea567059p11cbc6jsn1e51425a161c",
                    "X-Rapidapi-Host": "opencritic-api.p.rapidapi.com",
                }
            })
        setRecentlyReleased(response.data);

        } catch(err) {
            console.error("Game news error: ", err)
        }
    }

    const fetchUpcomingGames = async() => {

        try {
            const response = await axios.get("https://opencritic-api.p.rapidapi.com/game/upcoming", {
                headers: {
                    "X-Rapidapi-Key": "b1cf68ede7msh5d3f6e0ea567059p11cbc6jsn1e51425a161c",
                    "X-Rapidapi-Host": "opencritic-api.p.rapidapi.com",
                }
            })
        setUpcomingGames(response.data);
        } catch(err) {
            console.error("Game news error: ", err)
        }
    }

    useEffect(() => {
        fetchRecentlyReleased(),
        fetchUpcomingGames()
    }, [])

    return (
        <>
            <div className="underline font-bold text-center text-base">Recently Released Games</div>
            {recentlyReleased.map((item : any, index : any) => {
                return (
                <div
                    className="border border-green-500 my-2 p-2"
                    key={index}
                >
                    <div>Title: {item.name}</div>
                    <div>Critic Score: {item.topCriticScore}</div>
                    <div>Release Date: {item.firstReleaseDate.slice(0,10)}</div>
                    <div>
                        Platforms:
                    {item.Platforms.map((item : any, index : any) => {
                        return (
                            <div
                                key={index}
                            >
                            <li>{item.name}</li>
                            </div>
                    )
                    })}
                    </div>
                </div>
                )
            })}

            <div className="underline font-bold text-center text-base">Upcoming Games</div>
            {upcomingGames.map((item : any, index : any)=> {
                return (
                <div
                    className="border border-green-500 my-2 p-2"
                    key={index}
                >
                    <p>Title: {item.name}</p>
                    <p>Release Date: {item.firstReleaseDate.slice(0,10)}</p>
                    <p>
                        Platforms:
                    {item.Platforms.map((item : any, index: any) => {
                        return (
                            <li    
                                key={index}
                            >
                            {item.name}</li>
                    )
                    })}
                    </p>
                </div>
                )
            })}
        </>
    )
}


export default NewsTickerWidget;
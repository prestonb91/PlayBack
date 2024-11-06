// import axios from "axios"
// import { useState, useEffect } from "react"

const NewsTickerWidget: React.FC = () => {
//     const [recentlyReleased, setRecentlyReleased] = useState<any>([]);
//     const [upcomingGames, setUpcomingGames] = useState<any>([]);

//     const fetchRecentlyReleased = async() => {

//         try {
//             const response = await axios.get("https://opencritic-api.p.rapidapi.com/game/recently-released", {
//                 headers: {
//                     "X-Rapidapi-Key": "b1cf68ede7msh5d3f6e0ea567059p11cbc6jsn1e51425a161c",
//                     "X-Rapidapi-Host": "opencritic-api.p.rapidapi.com",
//                 }
//             })

//         console.log(response.data)
//         setRecentlyReleased(response.data);

//         } catch(err) {
//             console.error("Game news error: ", err)
//         }
//     }

//     const fetchUpcomingGames = async() => {

//         try {
//             const response = await axios.get("https://opencritic-api.p.rapidapi.com/game/upcoming", {
//                 headers: {
//                     "X-Rapidapi-Key": "b1cf68ede7msh5d3f6e0ea567059p11cbc6jsn1e51425a161c",
//                     "X-Rapidapi-Host": "opencritic-api.p.rapidapi.com",
//                 }
//             })

//         console.log(response.data)
//         setUpcomingGames(response.data);
//         } catch(err) {
//             console.error("Game news error: ", err)
//         }
//     }

//     useEffect(() => {
//         fetchRecentlyReleased(),
//         fetchUpcomingGames()
//     }, [])

    return (
        <>
            <h2>Recently Released Games</h2>
            {/* {recentlyReleased.map((item : any, index : any) => {
                return (
                <div
                    key={index}
                >
                    <p>{item.name}</p>
                    <p>{item.topCriticScore}</p>
                    <p>
                    {item.Platforms.map((item : any, index : any) => {
                        return (
                            <div
                                key={index}
                            >
                            {item.name}</div>
                    )
                    })}
                    </p>
                    <p>{item.firstReleaseDate.slice(0,10)}</p>
                </div>
                )
            })} */}

            <h2>Upcoming Games</h2>
            {/* {upcomingGames.map((item : any, index : any)=> {
                return (
                <div
                    key={index}
                >
                    <p>{item.name}</p>
                    <p>
                    {item.Platforms.map((item : any, index: any) => {
                        return (
                            <div    
                                key={index}
                            >
                            {item.name}</div>
                    )
                    })}
                    </p>
                    <p>{item.firstReleaseDate.slice(0,10)}</p>
                </div>
                )
            })} */}
        </>
    )
}


export default NewsTickerWidget;
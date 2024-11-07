interface Props {
    recentReview : any
}

const CardReviewWidget: React.FC<Props> = ({ recentReview }) => {

    return (
        <>
            {recentReview.map((item : any, index : any) => {
                    return (
                        <div
                            className="border border-green-500 m-2 p-2"
                            key={index}
                        >
                            <div className="text-center text-base font-bold mb-2">{item.title}</div>
                            <div className="m-2">{item.snippet}</div>
                            <div className="text-green-500 m-2 hover:text-green-600 truncate">
                                <a href={item.externalUrl}>{item.externalUrl}</a>
                            </div>
                        </div>
                    )
        })
    }
        </>
    )
}


export default CardReviewWidget;
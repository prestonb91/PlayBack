interface Props {
    recentReview : any
}

const CardReviewWidget: React.FC<Props> = ({ recentReview }) => {

    return (
        <>
            {recentReview.map((item : any, index : any) => {
                    return (
                        <div
                            key={index}
                        >
                            <p>{item.title}</p>
                            <p>{item.snippet}</p>
                            <p>{item.externalUrl}</p>
                        </div>
                    )
        })
    }
        </>
    )
}


export default CardReviewWidget;
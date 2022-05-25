import './Testimonial.css';

function Testimonial(props) {
    const reviews = props.data.map(reviewItem =>
        <div className="testimonial__col" key={reviewItem.reviewerPhoto}>
            <div className="testimonial__item" id="testimonial__1">
                <div className="testimonial__quote_img">
                    <img src={reviewItem.quoteImage} alt=""/>
                </div>
                <div className="testimonial__text">
                    {reviewItem.reviewText}
                </div>
                <div className="rate">
                    <img src={reviewItem.starImage} alt=""/>
                    <img src={reviewItem.starImage} alt=""/>
                    <img src={reviewItem.starImage} alt=""/>
                    <img src={reviewItem.starImage} alt=""/>
                    <img src={reviewItem.starImage} alt=""/>
                </div>
                <div className="testimonial__user_img">
                    <img src={reviewItem.reviewerPhoto} alt=""/>
                </div>
                <div className="testimonial__caption">
                    {reviewItem.reviewerName}
                </div>
            </div>
        </div>
    )
    return (
        <>
            {reviews}
        </>
    );
}

export default Testimonial;
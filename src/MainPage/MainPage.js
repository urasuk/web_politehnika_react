import './MainPage.css';
import ProductItemComponent from "../Product/ProductItemComponent";
import Testimonial from "../Testimonial/Testimonial";

import mainHeaderImage from "../img/pharmacy/pharmacy-main.png";
import quoteLeftSolid from "../img/quote-left-solid.svg";
import starSolid from "../img/star-solid.svg";

const productList = [
    {
        imagePath:"aaa",
        productName:"Solgar Таблетки для шкіри",
        productPrice:"1030 грн"
    },
    {
        imagePath:"aaa",
        productName:"Solgar Таблетки для шкіри",
        productPrice:"1040 грн"
    },
    {
        imagePath:"aaa",
        productName:"Solgar Таблетки для шкіри",
        productPrice:"1050 грн"
    },
    {
        imagePath:"aaa",
        productName:"Solgar Таблетки для шкіри",
        productPrice:"1060 грн"
    },    {
        imagePath:"aaa",
        productName:"Solgar Таблетки для шкіри",
        productPrice:"1030 грн"
    },
    {
        imagePath:"aaa",
        productName:"Solgar Таблетки для шкіри",
        productPrice:"1040 грн"
    },
    {
        imagePath:"aaa",
        productName:"Solgar Таблетки для шкіри",
        productPrice:"1050 грн"
    },
    {
        imagePath:"aaa",
        productName:"Solgar Таблетки для шкіри",
        productPrice:"1060 грн"
    }
];

const reviewsList = [
    {
        // quoteImage:  require.context("../img/quote-left-solid.svg", false, /\.(svg)$/),
        quoteImage:  quoteLeftSolid,
        reviewerName:"Sean Parker",
        reviewText: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, sed? Dolore, laboriosam praesentium et Lorem ipsum",
        reviewerPhoto: require("../img/user-1.png"),
        starImage: starSolid
    },
    {
        quoteImage:  quoteLeftSolid,
        reviewerName:"Mike Smith",
        reviewText: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, sed? Dolore, laboriosam praesentium et Lorem ipsum",
        reviewerPhoto: require("../img/user-2.png"),
        starImage: starSolid
    },
    {
        quoteImage:  quoteLeftSolid,
        reviewerName:"Галя Баба",
        reviewText: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, sed? Dolore, laboriosam praesentium et Lorem ipsum",
        reviewerPhoto: require("../img/user-3.png"),
        starImage: starSolid
    }
];

function MainPage(){

    // ------------------------------------------------------------------------------------------------
    function importAll(r) {
        let images = {};
        r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
        return images
    }
    const images = importAll(require.context('../img/pharmacy', false, /\.(png|jpe?g|svg|webp)$/));

    // console.log(images)

    let counterPict = 0;
    let keys = Object.keys(images);

    // console.log(keys);

    keys.every(key => {
        if (counterPict === productList.length) {
            return false;
        }
        productList[counterPict].imagePath = images[key];
        ++counterPict;
        return true;
    })

    // console.log(productList);
    // ------------------------------------------------------------------------------------------------

    return(
        <>
            <div className="main_header">
                <div className="container">
                    <div className="main_header__row">
                        <div className="main_header__text">
                            <h1>Howdy ho</h1>
                            <p>Our store is more than just another average online retailer. We sell not only top quality
                                products, but give our customers a positive online shopping experience.</p>
                            <a href="#" className="btn"><span>Explore now</span></a>
                        </div>
                        <div className="main_header__image">
                            <img src={mainHeaderImage} alt="intro image"/>
                        </div>
                    </div>
                </div>
            </div>
            <main className="content">
                <div className="container">
                    <h2 className="products__title products__title-featured">Featured products</h2>
                    <div className="featured_products__row">
                        <ProductItemComponent data={productList}/>
                    </div>
                    <h2 className="products__title products__title-recent">Recent products</h2>
                    <div className="recent_products__row">
                        <ProductItemComponent data={productList}/>
                    </div>
                </div>
            </main>
            <div className="testimonial">
                <div className="testimonial__body">
                    <div className="testimonial__row">
                        <Testimonial data={reviewsList}/>
                    </div>
                </div>
            </div>
        </>

    )
}

export default MainPage;
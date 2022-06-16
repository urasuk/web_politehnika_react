import './MainPage.css';
import ProductItemComponent from "../Product/ProductItemComponent";
import Testimonial from "../Testimonial/Testimonial";

import mainHeaderImage from "../img/pharmacy/pharmacy-main.png";
import quoteLeftSolid from "../img/quote-left-solid.svg";
import starSolid from "../img/star-solid.svg";
import {useEffect, useState} from "react";
import axios from "axios";



const reviewsList = [
    {
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

    // // ------------------------------------------------------------------------------------------------
    // function importAll(r) {
    //     let images = {};
    //     r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
    //     return images
    // }
    // const images = importAll(require.context('../img/pharmacy', false, /\.(png|jpe?g|svg|webp)$/));
    //
    // // console.log(images)
    //
    // let counterPict = 0;
    // let keys = Object.keys(images);
    //
    // // console.log(keys);
    //
    // keys.every(key => {
    //     if (counterPict === productList.length) {
    //         return false;
    //     }
    //     productList[counterPict].imagePath = images[key];
    //     ++counterPict;
    //     return true;
    // })
    //
    // // console.log(productList);
    // // ------------------------------------------------------------------------------------------------

    const [productList, setProductList] = useState([]);
    const URL_PRODUCTS = 'http://127.0.0.1:5000/api/v15/medicine';


    useEffect(() => {
        fetchProducts();
    },[])
    //React Hooks: useEffect() is called twice even if an empty array is used as an argument
    //StrictMode renders components twice (on dev but not production)
    //in order to detect any problems with your code and warn you about them (which can be quite useful).
    //https://stackoverflow.com/questions/39974210/why-componentdidmount-gets-called-multiple-times-in-react-js-redux

    const fetchProducts = () => {
        axios.get(URL_PRODUCTS)
            .then( response => {
                console.log(response.data)
                setProductList(response.data);
            })
            .catch(response => {
                console.log("error" + response);
            })
    }

    return(
        <>
            <div className="main_header">
                <div className="container">
                    <div className="main_header__row">
                        <div className="main_header__text">
                            <h1>Howdy ho</h1>
                            <p>Our store is more than just another average online retailer. We sell not only top quality
                                products, but give our customers a positive online shopping experience.</p>
                            <a href="/chat" className="btn"><span>Explore now</span></a>
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
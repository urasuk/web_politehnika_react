import ProductItemComponent from "../Product/ProductItemComponent";
import './Products.css';
import imageArrow from '../img/arrow.svg';
import {useState, useEffect} from "react";
import axios from "axios";



function Products(){

    const URL_PRODUCTS = 'http://127.0.0.1:5000/api/v15/medicine';


    const [allProductsList, setAllProductsList] = useState([]);


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
                setAllProductsList(response.data);
            })
            .catch(response => {
                console.log("error" + response);
            })
    }

    return(
        <div className={"productsBackGround"} >
            <main className="content">
            <div className="container">
                    <div className="all_products">
                        <div className="all_products__row all_products__row-title">
                            <h1 id="all_products__item_title" className="item_title">All products</h1>
                            {/*<select name="sort_type" id="all_products__select">*/}
                            {/*    <option value="sort_1">Default Sorting</option>*/}
                            {/*    <option value="sort_2">Sort by price</option>*/}
                            {/*    <option value="sort_3">Sort by popularity</option>*/}
                            {/*    <option value="sort_4">Sort by rate</option>*/}
                            {/*</select>*/}
                        </div>
                        <div className="all_products__row" >
                            <ProductItemComponent data={allProductsList} />
                        </div>
                        {/*<div className="page_buttons">*/}
                        {/*    <span>1</span><span>2</span><span>3</span><span> <img src={imageArrow} alt=""/></span>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Products;



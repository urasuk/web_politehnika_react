import './ProductItemComponent.css';
// import productPicture from "../img/pharmacy/img_0(0).webp";
import {BrowserRouter as Router, Routes, Route, Link, NavLink} from "react-router-dom";


function ProductItemComponent(props){
    // let imageName = require("../img/pharmacy/img_0(0).webp");
    const finalProducts = props.data.map( productItem =>
                <a className="product__col" key={productItem.imagePath} href="/productDetails">
                    <div className="product__image">
                        {/*<img key={productItem.imagePath} src={require(productItem.imagePath)} alt=""/>*/}
                        <img key={productItem.imagePath} src={productItem.imagePath} alt=""/>
                    </div>
                    <h4 className="product-name">{productItem.productName}</h4>
                    <p className="product-price">{productItem.productPrice}</p>
                </a>
            );
    return(
            <>
                {finalProducts}
            </>
        );
}
export default ProductItemComponent;
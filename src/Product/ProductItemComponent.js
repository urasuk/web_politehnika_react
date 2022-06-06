import './ProductItemComponent.css';

function ProductItemComponent(props){
    const finalProducts = props.data.map( productItem =>
                <a className="product__col" key={productItem.imageName}
                   href={`/productInfo/${productItem.name}/${productItem.price}
                   /${productItem.category}/${productItem.manufacturer}/${productItem.productDetails}
                   /${productItem.demand}/${productItem.mid}/${productItem.imageName.replace(/\//g, '@')}`}>
                    <div className="product__image">
                        {/*<img key={productItem.imagePath} src={productItem.imagePath} alt=""/>*/}
                        <img key={productItem.imageName} src={`https://i.postimg.cc${productItem.imageName}`} alt=""/>
                    </div>
                    <h4 className="product-name">{productItem.name}</h4>
                    <p className="product-price">{parseInt(productItem.price) + ' грн'}</p>
                </a>
            );
    return(
            <>
                {finalProducts}
            </>
        );
}
export default ProductItemComponent;
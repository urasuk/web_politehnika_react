import './ProductDetails.css';
import ProductItemComponent from "../Product/ProductItemComponent";

// поки що так (потім потрібно буде реалізувати, з запитами. діставити всі дані зразу на сторінці Products (на ній виводити лише картинку
// ціну і назву) а потім решта даних при переході на productItemComponent, ми в productDetails передаватимемо дескрипшн, деманд і тд)
import mainProductImage from "../img/pharmacy/img_0(0).webp";

const productProposalsList = [
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
    }
];

function ProductDetails() {

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
        if (counterPict === productProposalsList.length) {
            return false;
        }
        productProposalsList[counterPict].imagePath = images[key];
        ++counterPict;
        return true;
    })

    // console.log(productList);
    // ------------------------------------------------------------------------------------------------

    return(
        <main className="content">
            <div className="container">
                <div className="single-product">
                    <div className="single-product__row">
                        <div className="single-product__col1">
                            <div className="single-product__image">
                                <img src={mainProductImage} alt=""/>
                            </div>
                        </div>
                        <div className="single-product__col2">
                            <div className="single-product__body">
                                <div className="single-product__header">
                                    <h2 className="single-product__subtitle">Вітаміни/Комплексні</h2>
                                    <form action="#" className="single-product__form1" method="get">
                                        <label htmlFor="for-checkbox" className="input_label">Is on demand ?</label>
                                        <div id="hidden">
                                            <input type="checkbox" name="is-on-demand" id="for-checkbox" value="1"/>
                                                <button type="submit" id="btn0"> Submit</button>
                                        </div>
                                    </form>
                                </div>
                                <h1 className="single-product__title">Solgar<br/>вітаміни для шкіри</h1>
                                <div className="single-product__price">1018 грн</div>
                                <form action="#" method="get" className="single-product__form2">
                                    <label htmlFor="for-number" className="input_label" id="input_label__modificator">Enter
                                        number of items: </label>
                                    <input type="number" id="for-number" name="product-quantity" min="1" value="1"/>
                                        <button type="submit" className="btn"> Add to cart</button>
                                </form>

                                <div className="single-product__details">Product Details</div>
                                <p className="single-product__details_text">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi consequuntur odit
                                    numquam aspernatur eligendi quae quibusdam voluptatem earum atque, neque dicta
                                    ducimus. Suscipit, rerum culpa nulla impedit sint ea laborum?
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="all_products__in__details">
                    <h1 id="all_products__in__details__item_title" className="item_title">Related products</h1>
                    <div className="all_products__in__details__row">
                        <ProductItemComponent data={productProposalsList}/>
                    {/*    must be 4 proposals*/}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ProductDetails;
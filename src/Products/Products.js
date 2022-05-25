import ProductItemComponent from "../Product/ProductItemComponent";
import './Products.css';
import imageArrow from '../img/arrow.svg';

const allProductsList = [
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

function Products(){

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
        if (counterPict === allProductsList.length) {
            return false;
        }
        allProductsList[counterPict].imagePath = images[key];
        ++counterPict;
        return true;
    })

    // console.log(productList);
    // ------------------------------------------------------------------------------------------------

    return(
        <div className={"productsBackGround"}>
            <main className="content">
                <div className="container">
                    <div className="all_products">
                        <div className="all_products__row all_products__row-title">
                            <h1 id="all_products__item_title" className="item_title">All products</h1>
                            <select name="sort_type" id="all_products__select">
                                <option value="sort_1">Default Sorting</option>
                                <option value="sort_2">Sort by price</option>
                                <option value="sort_3">Sort by popularity</option>
                                <option value="sort_4">Sort by rate</option>
                            </select>
                        </div>
                        <div className="all_products__row">
                            <ProductItemComponent data={allProductsList}/>
                        </div>
                        <div className="page_buttons">
                            <span>1</span><span>2</span><span>3</span><span> <img src={imageArrow} alt=""/></span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Products;
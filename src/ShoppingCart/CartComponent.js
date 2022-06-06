
import './ShoppingCart.css';

let CartComponent = (props) => {

    return(
            <tr key={props.product.imageName} className={"product__row"}>
                <td className="main_table__data" >
                    <div className="cart-info">
                        <img src={`https://i.postimg.cc${props.product.imageName}`} alt=""/>
                        <div className="cart-text">
                            <p> {props.product.name}</p>
                            <small>Price: {props.product.price} грн</small>
                            <br/>
                            <button onClick={() => props.remove(props.product)}>Remove</button>
                             {/*onClick={props.remove(props.product)} ЯКЩО ТАК, ТО ОДРАЗУ КЛІКАЄ*/}
                        </div>
                    </div>
                </td>
                <td><input type="number" defaultValue={props.product.quantity} readOnly min="1"/></td>
                <td>{props.product.quantity*props.product.price} грн</td>
            </tr>
    )
    // let medId = -1;
    // function removeItem(){
    //     console.log("Remove")
    //     let storageProducts = JSON.parse(localStorage.getItem('products'));
    //     console.log(props.data)
    //     console.log(storageProducts)
    //     console.log(props.data.mid)
    //     console.log(medId);
    //     let products = storageProducts.filter(product => +product.medicine_id !== +medId);
    //     localStorage.setItem('products', JSON.stringify(products));
    // }
    // let products = props.data.map( productItem => {
    //     medId = productItem.mid;
    //     return(
    //             <tr key={productItem.imageName} className={"product__row"}>
    //                 <td className="main_table__data" >
    //                     <div className="cart-info">
    //                         <img src={`https://i.postimg.cc${productItem.imageName}`} alt=""/>
    //                         <div className="cart-text">
    //                             <p> {productItem.name}</p>
    //                             <small>Price: {productItem.price} грн</small>
    //                             <br/>
    //                             <button onClick={removeItem}>Remove</button>
    //                         </div>
    //                     </div>
    //                 </td>
    //                 <td><input type="number" defaultValue={productItem.quantity} min="1"/></td>
    //                 <td>{productItem.quantity*productItem.price} грн</td>
    //             </tr>
    //     )
    // } )
    //{products}
}
export default CartComponent;


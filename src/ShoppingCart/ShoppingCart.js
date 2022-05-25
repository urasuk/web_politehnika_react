import './ShoppingCart.css';

import prodImageOne from '../img/pharmacy/img_0(4).webp';
import prodImageTwo from '../img/pharmacy/img_0(7).webp';
import prodImageThree from '../img/pharmacy/img_0(10).webp';


function ShoppingCart() {
    return(
        <main className="content">
            <div className="container">
                <div className="cart cart-page">
                    <table className="main_table">
                        <tr>
                            <th className="main_table__col_name">Product</th>
                            <th className="main_table__col_name">Quantity</th>
                            <th className="main_table__col_name">Subtotal</th>
                        </tr>
                        <tr>
                            <td className="main_table__data">
                                <div className="cart-info">
                                    <img src={prodImageOne} alt=""/>
                                        <div className="cart-text">
                                            <p> Solgar вітаміни для шкіри</p>
                                            <small>Price: 1018 грн</small>
                                            <br/>
                                                <a href="">Remove</a>
                                        </div>
                                </div>
                            </td>
                            <td><input type="number" defaultValue={"1"} min="1"/></td>
                            <td>1018 грн</td>
                        </tr>
                        <tr>
                            <td className="main_table__data">
                                <div className="cart-info">
                                    <img src={prodImageTwo} alt=""/>
                                        <div className="cart-text">
                                            <p> Пластир медичний перцевий</p>
                                            <small>Price: 17 грн</small>
                                            <br/>
                                                <a href="">Remove</a>
                                        </div>
                                </div>
                            </td>
                            <td><input type="number" defaultValue={"1"} min="1"/></td>
                            <td>17 грн</td>
                        </tr>
                        <tr>
                            <td className="main_table__data">
                                <div className="cart-info">
                                    <img src={prodImageThree} alt=""/>
                                        <div className="cart-text">
                                            <p> Бодяга гель</p>
                                            <small>Price: 22 грн</small>
                                            <br/>
                                                <a href="">Remove</a>
                                        </div>
                                </div>
                            </td>
                            <td><input type="number" defaultValue={"1"} min="1"/></td>
                            <td>22 грн</td>
                        </tr>
                    </table>
                    <div className="total-price">
                        <table>
                            <tr>
                                <td>Total</td>
                                <td>1057 грн</td>
                            </tr>
                        </table>
                    </div>
                </div>

            </div>
        </main>
    )
}

export default ShoppingCart;
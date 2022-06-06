import './ShoppingCart.css';
import CartComponent from "./CartComponent";
import {useEffect, useState} from "react";
import Axios from "axios";
import React from "react";
import axios from "axios";


function ShoppingCart() {
    // localStorage.setItem('products','[{"medicine_id":"4","product_quantity":"1"},{"medicine_id":"1","product_quantity":"1"}]');
    console.log("hello");
    const URL_PRODUCT = 'http://127.0.0.1:5000/api/v15/medicine/';  // get product url
    let PHARMACY_ORDERS_MEDICINES_PATH = 'http://127.0.0.1:5000/api/v15/pharmacy/orders/medicines/';

    let productsInStorage = JSON.parse(localStorage.getItem("products"));


    let [productsCartInfoList,setProductsCartInfoList] = useState([]);

    let [productsInStorageState,setProductsInStorageState] = useState(JSON.parse((localStorage.getItem("products"))));

    const removeItem = async (productToDelete) => {
        console.log("click!!!!")
        let storageProducts = JSON.parse(localStorage.getItem('products'));
        let products = storageProducts.filter(product => +product.medicine_id !== +productToDelete.mid);
        localStorage.setItem('products', JSON.stringify(products));
        console.log("STATE IS CHANGED? ");
        productsInStorageState.forEach(product => console.log(product));

        // need to be changed for correct (state -> productsCartInfoList) generation
        productsInStorage = JSON.parse(localStorage.getItem('products'));

        setProductsInStorageState(productsInStorageState.filter(p => p.medicine_id !== productToDelete.mid))
        // window.location.reload();

        // need to be called, cuz after setProductsInStorageState1, useEffect won't call, because of [] parameter
        await getProductsRequest();

        deleteMedicineFromOrderRequestHandler(localStorage.getItem('orderId'), +productToDelete.mid)

    }

    let authAxios;

    let deleteMedicineFromOrderRequestHandler = async (orderId, medicineId) => {
         PHARMACY_ORDERS_MEDICINES_PATH += `${orderId}/${medicineId}`
         authAxios = axios.create({
            baseURL: PHARMACY_ORDERS_MEDICINES_PATH + `${orderId}/${medicineId}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        try{
            const response = await authAxios.delete(PHARMACY_ORDERS_MEDICINES_PATH);
            console.log("success", response);
        } catch (error) {
            console.log("error: " + error);
        }
    }


    let total = 0;
    if (productsCartInfoList !== []) {
        for (let productCartItem of productsCartInfoList) {
            total += productCartItem['quantity'] * productCartItem['price'];
            console.log(total);
        }
    }

    // based on data at productsInStorage, we change our (state -> productsCartInfoList)
    let getProductsRequest = async () => {
        let productInfo = [];
        console.log("lap")

        for (let productItem of productsInStorage) {

            let myResponse = [];
            let URL = URL_PRODUCT + productItem["medicine_id"];
            await Axios
                .get(URL)
                .then((response => {
                    response.data["quantity"] = productItem["product_quantity"];
                    myResponse = response.data;
                }))
                .catch((error) => console.log("error setProductCategory" + error.response.data))
            console.log("iGet ", myResponse)
            productInfo.push(myResponse);
        }


        console.log("final ", productInfo);

        setProductsCartInfoList(productInfo);
        console.log("setProductsCartInfoList ", productsCartInfoList);

    }


    useEffect(  () => {
        getProductsRequest();
    },[])




    return(
        <main className="content">
            <div className="container">
                <div className="cart cart-page">
                    <table className="main_table">
                        <thead>
                            <tr>
                                <th className="main_table__col_name">Product</th>
                                <th className="main_table__col_name">Quantity</th>
                                <th className="main_table__col_name">Subtotal</th>
                            </tr>
                        </thead>
                        {/*<CartComponent data={productsCartInfoList}/>*/}
                        <tbody>
                            {productsCartInfoList.map( productItem => <CartComponent remove={removeItem}
                                                                                     key={productItem.mid} product={productItem}/>)}
                        </tbody>
                    </table>
                    <div className="total-price">
                        <table>
                            <thead>
                                <tr>
                                    <td>Total</td>
                                    <td>
                                        {total}
                                    </td>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>

            </div>
        </main>
    )

}

export default ShoppingCart;
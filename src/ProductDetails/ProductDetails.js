import './ProductDetails.css';
import ProductItemComponent from "../Product/ProductItemComponent";
import {createRef, useCallback, useEffect, useState} from "react";
import Axios from "axios";
import {useParams} from "react-router-dom";
import axios from "axios";
// /productDetails/name/price/imageName/category/manufacturer/productDetails/demand/mid
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



// toast.configure()
function ProductDetails() {
    let {name} = useParams();
    let {price} = useParams();
    let {imageName} = useParams();
    let {category} = useParams();
    // let {manufacturer} = useParams();
    let {productDetails} = useParams();
    // let {demand} = useParams();
    let {mid} = useParams();

    let adminDeleteProductForm = createRef();

    const URL_PRODUCTS = 'http://127.0.0.1:5000/api/v15/medicine';  // get all products request
    let URL_MEDICINE_ITEM = 'http://127.0.0.1:5000/api/v15/medicine/' + mid; // for product delete request
    let MEDICINE_CATEGORY = 'http://127.0.0.1:5000/api/v15/medicine/category/' + category; // for category get request
    let DEMAND_MEDICINE = 'http://127.0.0.1:5000/api/v15/demand/medicine/' + mid;
    let CREATE_ORDER = 'http://127.0.0.1:5000/api/v15/pharmacy/orders';
    let PHARMACY_ORDERS_MEDICINES_PATH = 'http://127.0.0.1:5000/api/v15/pharmacy/orders/medicines';

    const [productProposalsList, setProductProposalsList ]= useState([]);
    const [productCategory, setProductCategory ]= useState("some category");

    let productQuantityRef = createRef();

    useEffect( () => {

        if (localStorage.getItem("userStatus") === "admin"){
            adminDeleteProductForm.current.style.display = "block";
        }
        else {
            adminDeleteProductForm.current.style.display = "none";
        }

        Axios
            .get(URL_PRODUCTS)
            .then((response => setProductProposalsList(response.data)))
            .catch( (response) => console.log("error setProductProposalsList" + response.data))

        Axios
            .get(MEDICINE_CATEGORY)
            .then((response => setProductCategory(response.data.name)))
            .catch( (response) => console.log("error setProductCategory" + response.data))
    },[]
    )

    const authAxios = axios.create({
        baseURL: URL_MEDICINE_ITEM,
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });

    const deleteProduct = useCallback(async (event) => {
        event.preventDefault();
        try{
            const result = await authAxios.delete(URL_MEDICINE_ITEM);
            console.log("success");
            window.location.replace("/products");
        } catch (error) {
            console.log("error: " + error);
        }
    })

    const demandRequest = useCallback(async (event) => {
        event.preventDefault();
        try{
            if (localStorage.getItem('userId') === null){
                throw {response:{data:"Please, log in first!"}};
            }
            const result = await authAxios.put(DEMAND_MEDICINE,{"demand":0});
            console.log(result);
            console.log(result.data);
            toast(result.data);
        } catch (error) {
            console.log("error: " + error.response.data);
            toast(error.response.data);
        }
    })

    const addToCartRequest = useCallback(async (event) => {
        event.preventDefault();
        if (!localStorage.getItem('orderId')){
            try{

                let today = new Date();
                let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                let dateTime = date+' '+time;

                if (localStorage.getItem('userId') === null){
                    throw {response:{data:"Please, log in first!"}};
                }

                if (localStorage.getItem('userStatus') === 'admin'){
                    throw {response:{data:"Admin can't add products to order!"}};
                }

                const data = {
                    userId : localStorage.getItem('userId'),
                    shipDate : dateTime,
                    status : 'placed'
                };

                const result = await authAxios.post(CREATE_ORDER,data);
                console.log(result);
                console.log(result.data);

                let key = Object.keys(result.data) // there is a message in key list at key[0] position
                const newOrderId = result.data[key]; // there is a recently created order id
                toast(key[0]);

                localStorage.setItem('orderId', newOrderId);
            } catch (error) {
                // console.log(error);
                // console.log(error.response);
                // console.log(error.response.data);
                toast(error.response.data); // if axios return error, then data is not directly in response from server, its in response
            }

        }

        addMedicineToOrder();
    })


    async function addMedicineToOrder(){
        try{
            const data = {
                order_id : localStorage.getItem('orderId'),
                medicine_id : mid,
                quantity: productQuantityRef.current.value
            };

            const result = await authAxios.post(PHARMACY_ORDERS_MEDICINES_PATH,data);
            console.log(result);
            console.log(result.data);
            toast(result.data);

            addProductToCart(mid, productQuantityRef.current.value)

        }catch (error){
            console.log(error);
            toast(error.response.data);
        }
    }

    function addProductToCart(medicine_id, quantity){
        let products = [];
        if(localStorage.getItem('products')){
            products = JSON.parse(localStorage.getItem('products'));
        }
        products.push({'medicine_id' : medicine_id , 'product_quantity' : quantity});
        localStorage.setItem('products', JSON.stringify(products));
    }


    return(
        <main className="content">
            <div className="container">
                <div className="single-product">
                    <div className="single-product__row">
                        <div className="single-product__col1">
                            <div className="single-product__image">
                                <img src={`https://i.postimg.cc${imageName.replace(/@/g, '/')}`} alt=""/>
                            </div>
                        </div>
                        <div className="single-product__col2">
                            <div className="single-product__body">
                                <div className="single-product__header">
                                    <h2 className="single-product__subtitle">{productCategory}</h2>
                                    <form action="#" className="single-product__form1" method="post" onSubmit={demandRequest}>
                                        <label htmlFor="for-checkbox" className="input_label">Is on demand ?</label>
                                        <div id="hidden">
                                            {/*<input type="checkbox" name="is-on-demand" id="for-checkbox" defaultValue="1"/>*/}
                                                <button type="submit" id="btn0"> Submit</button>
                                        </div>
                                    </form>
                                </div>
                                <h1 className="single-product__title">{name}</h1>
                                <div className="single-product__price">{price} грн</div>
                                <form action="#" method="get" className="single-product__form2" onSubmit={addToCartRequest}>
                                    <label htmlFor="for-number" className="input_label" id="input_label__modificator">Enter
                                        number of items: </label>
                                    <input type="number" id="for-number" name="product-quantity" min="1" defaultValue="1" ref={productQuantityRef}/>
                                        <button type="submit" className="btn"> Add to cart</button>
                                </form>
                                <form action="#" method={"delete"} className="single-product__admin__delete" ref={adminDeleteProductForm} onSubmit={deleteProduct}>
                                    <button type="submit" className="btn btn__modifier"> Delete</button>
                                </form>

                                <div className="single-product__details">Product Details</div>
                                <p className="single-product__details_text">
                                    {productDetails}
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
                <ToastContainer/>
            </div>
        </main>
    )
}

export default ProductDetails;
import './Header.css';

import imageMenuPhone from "../img/menu.png";

import MainPage from "../MainPage/MainPage";
import SignUp from '../SignUp/SignUp'
import Login from "../Login/Login";
import Account from "../Account/Account";
import Products from "../Products/Products";
import ProductDetails from "../ProductDetails/ProductDetails";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import React from "react";

import {BrowserRouter as Router, Routes, Route, Link, NavLink} from "react-router-dom";


function Header(){

    // let menuOptions =React.createRef();
    let [options,setOptions] = React.useState(); // даний стейт зберігає html код з NavLink-ами

    function changeHeader(){
         // const headerOptionsElement = menuOptions.current;
        // headerOptionsElement.innerHTML = "";
        if(localStorage.getItem('token') === null){
            // headerOptionsElement.insertAdjacentHTML("beforeend",
            //         '<NavLink className="option" to="/main" > Home </NavLink>' +
            //         '<NavLink className="option" to="/products"> Products </NavLink>' +
            //         '<NavLink className="option" to="/login"> Log in </NavLink>' +
            //         '<NavLink className="option" to="/signup"> Sign up </NavLink>'
            // );

            setOptions(
                <>
                    <NavLink className="option" to="/main" > Home </NavLink>
                    <NavLink className="option" to="/products"> Products </NavLink>
                    <NavLink className="option" to="/login"> Log in </NavLink>
                    <NavLink className="option" to="/signup"> Sign up </NavLink>
                </>)
        } else {
            // headerOptionsElement.insertAdjacentHTML("beforeend",
            //     '<NavLink className="option" to="/main" > Home </NavLink>' +
            //     '<NavLink className="option" to="/products"> Products </NavLink>' +
            //     '<NavLink className="option" to="/login"> Log out </NavLink>' +
            //     '<NavLink className="option" to="/account"> Account </NavLink>' +
            //     '<NavLink className="menu__cart" to="/cart"></NavLink>')
            setOptions(
                <>
                    <NavLink className="option" to="/main" > Home </NavLink>
                    <NavLink className="option" to="/products"> Products </NavLink>
                    <NavLink className="option" to="/login"> Log out </NavLink>
                    <NavLink className="option" to="/account"> Account </NavLink>
                    <NavLink className="menu__cart" to="/cart"></NavLink>
                </>)
        }

    }

    return(
        <Router>
            <header className="general_header">
                <div className="header">
                        <div className="container">
                            <nav className="menu__row" onLoad={changeHeader}>
                                {/*незалежно від того чи є в нас токен чи нема, menu__logo кидає на /main */}
                                <NavLink className="menu__logo" to="/main"></NavLink>
                                <div className="menu__options">
                                    {options}
                                </div>
                                <img src={imageMenuPhone} className="menu__icon" alt=""/>
                            </nav>
                        </div>
                </div>
            </header>
            <Routes>
                <Route path={"/main"} element={<MainPage/>}/>
                <Route path={"/signup"} element={<SignUp/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/account"} element={<Account/>}/>
                <Route path={"/products"} element={<Products/>}/>
                <Route path={"/cart"} element={<ShoppingCart/>}/>
                <Route path={"/productDetails"} element={<ProductDetails/>}/>
            </Routes>
        </Router>

    )
}

export default Header;
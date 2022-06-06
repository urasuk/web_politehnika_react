import './App.css';
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import {useState} from "react";


function App() {

  return (
      < div className="wrapper">
          {/*  <header className="header">*/}
          {/*      <div className="container">*/}
          {/*          <nav className="menu__row">*/}
          {/*              <a className="menu__logo" to="/main"></a>*/}
          {/*              <div className="menu__options">*/}
          {/*                  <a className="option" href="/testComponent"> Products </a>*/}
          {/*                  <a className="option" href="/main"> Log in </a>*/}
          {/*              </div>*/}
          {/*              <img src="img/menu.png" className="menu__icon" alt=""/>*/}
          {/*          </nav>*/}
          {/*      </div>*/}
          {/*  </header>*/}

          {/*<Router>*/}
          {/*    <header className="header">*/}
          {/*        <div className="container">*/}
          {/*            <nav className="menu__row">*/}
          {/*                <NavLink className="menu__logo" to="/main"></NavLink>*/}
          {/*                <div className="menu__options">*/}
          {/*                    <NavLink className="option" to="/main"> Home </NavLink>*/}
          {/*                    /!*<a className="option" href="/testComponent"> Products </a>*!/*/}
          {/*                    <NavLink className="option" to="/testComponent"> Products </NavLink>*/}
          {/*                    <NavLink className="option" to="/testimonial"> Log in </NavLink>*/}
          {/*                    <NavLink className="option" to="/main"> Sign up </NavLink>*/}
          {/*                    <NavLink className="option" to="/main"> Account </NavLink>*/}
          {/*                    <NavLink className="option" to="/main"> Account </NavLink>*/}
          {/*                    <NavLink className="menu__cart" to="/main"></NavLink>*/}
          {/*                </div>*/}
          {/*                <img src="img/menu.png" className="menu__icon" alt=""/>*/}
          {/*            </nav>*/}
          {/*        </div>*/}
          {/*    </header>*/}
          {/*    <Routes>*/}
          {/*        <Route path={"/main"} element={<MainPage/>}/>*/}
          {/*        <Route path={"/testComponent"} element={<TestComponent/>}/>*/}
          {/*        <Route path={"/testimonial"} element={<Testimonial/>}/>*/}
          {/*    </Routes>*/}
          {/*</Router>*/}
          {/*<MainPage/>*/}
        <Header/>
        <Footer/>
      </div>
  );
}

export default App;

import './SignUp.css';
import registerImage from '../img/pharmacy/pharmacy-main.png';
// import ReactDOM from "react-dom/client";
import React from "react";


function SignUp(){

    const POST = 'POST';
    const URL_CREATE_USER = 'http://127.0.0.1:5000/api/v15/user';

    // const inputDataElements = findDOMNode(<instance-of-outermost-component>).getElementsByClassName('snap');
    const emailElementRef = React.createRef();
    const firstnameElementRef = React.createRef();
    const lastnameElementRef = React.createRef();
    const phoneElementRef = React.createRef();
    const passwordElementRef = React.createRef();
    const usernameElementRef = React.createRef();
    const userStatusElementRef = React.createRef();


    // post method to send user's data and get response from server [ to sign up ]
    function signupQuery() {
        return new Promise((resolve, reject) => {
            const url = URL_CREATE_USER;
            const xhr = new XMLHttpRequest();


            xhr.open(POST, url, true);

            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onload = () => {
                if (xhr.status >= 400) {
                    reject(xhr.response);
                } else {
                    console.log("Success sign up!!! " + xhr.responseText);
                    localStorage.setItem('token', xhr.response);
                    localStorage.setItem('email', emailElementRef.current.value);
                    resolve({"token":xhr.response});
                }
            }

            xhr.onerror = () => {
                reject(xhr.response);
            }

            const sendObject = JSON.stringify({
                email: emailElementRef.current.value,
                firstname: firstnameElementRef.current.value,
                lastname: lastnameElementRef.current.value,
                password: passwordElementRef.current.value,
                phone: phoneElementRef.current.value,
                username: usernameElementRef.current.value,
                userstatus:userStatusElementRef.current.value
            });
            xhr.send(sendObject);
        })

    }

    function submitSignupForm (event){
        event.preventDefault();

        console.log("input_item.getAttribute('required')")
        signupQuery().then((response) => {
            console.log("then ->" + response['token']);
            setTimeout(() => {
                window.location.replace("/main");
            }, 500)
        })
            .catch((e) => {
                console.log("error ->" + e)

            })
    }

    return(

         <main className="content content__background">
             <div className="container">
                 <div className="main__row_for_login_signup">
                     <div className="main__image">
                         <img src={registerImage} alt=""/>
                     </div>
                     <div className="main__form">
                         <h1>Sign up</h1>
                         <form action="#" method="get" className="form" onSubmit={submitSignupForm}>
                             <input type="text" name="username" className="input_data" placeholder="username"
                                    minLength="5" maxLength="10" aria-required="true" ref={usernameElementRef} required/>
                             <input type="text" name="firstname" className="input_data" placeholder="enter firstname"
                                    ref={firstnameElementRef} required/>
                             <input type="text" name="lastname" className="input_data" placeholder="enter lastname"
                                    ref={lastnameElementRef} required/>
                             <input type="text" name="userStatus" className="input_data" placeholder="enter status"
                                    ref={userStatusElementRef} required/>
                             <input type="tel" name="phone" className="input_data"
                                    pattern="\d{3}[\-\s]?\d{3}[\-\s]?\d{2}[\-\s]?\d{2}" placeholder="068 230 89 28"
                                    minLength="10" maxLength="13" ref={phoneElementRef} required/>
                             <input type="email" name="email" className="input_data" placeholder="user@gmail.com"
                                    ref={emailElementRef}
                                    required/>
                             <input type="password" name="password" className="input_data" placeholder="password"
                                    ref={passwordElementRef}
                                    required/>
                             <button type="submit" onSubmit="anyAction" className="btn btn__modifier">
                                 <span>Sign up</span></button>
                         </form>

                     </div>
                 </div>
             </div>
         </main>

    )
}
export default SignUp;
// import '../SignUp/SignUp.css';
import registerImage from '../img/pharmacy/pharmacy-main.png';
import React from "react";

function Login() {

    const POST = 'POST';

    const URL_LOG = 'http://127.0.0.1:5000/api/v15/user/login';

    let emailRef = React.createRef();
    let passwordRef = React.createRef();
    let mainNotificationRef = React.createRef();
    let notificationMessageRef =  React.createRef();
    let submitButtonRef = React.createRef();
    let pageTitle = React.createRef();

    // post method to send user's email, password and get response from server [ to log in ]
    function loginQuery() {
        return new Promise((resolve, reject) => {
            const url = URL_LOG;
            const xhr = new XMLHttpRequest();

            // const emailNode = document.querySelector('#email');
            // const passwordNode = document.querySelector('#password');
            const emailNode = emailRef.current.value;
            const passwordNode = passwordRef.current.value;

            // const emailValue = emailNode.value;
            // const passwordValue = passwordNode.value;
            const emailValue = emailNode;
            const passwordValue = passwordNode;

            xhr.open(POST, url, true);

            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onload = () => {
                if (xhr.status >= 400) {
                    reject(xhr.response);
                } else {
                    // console.log("Success!!! " + xhr.responseText);
                    localStorage.setItem('token', xhr.response);
                    localStorage.setItem('email', emailValue);
                    resolve({"token":xhr.response});
                }
            }

            xhr.onerror = () => {
                reject(xhr.response);
            }

            const sendObject = JSON.stringify({email: emailValue, password: passwordValue});
            xhr.send(sendObject);
        })
    };

    // const loginNotificationBlock = document.querySelector('.main__notification');
    // const loginNotificationMessage = document.querySelector('.notification__message');

    // REACT
    // так не хоче працювати. роблю на пряму
    // const loginNotificationBlock = mainNotificationRef.current;
    // const loginNotificationMessage = notificationMessageRef.current;


    let loggedIn = false;

    // function that invokes when user press on Log In / Log Out button and calls loginQuery() or clears local storage (appropriately)
    function sendQuery(event) {
        event.preventDefault();

        if(localStorage.getItem('token') !== null){
            // log out
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            // location.reload();
            window.location.reload();
        } else {
            // log in
            loginQuery()
                .then((response) => {
                    console.log("then ->" + response['token']);
                    // loginNotificationMessage.textContent = "Successfully logged in!";
                    notificationMessageRef.current.innerHTML = "Successfully logged in!";

                    // loginNotificationBlock.style.display = 'block';
                    mainNotificationRef.current.style.display = 'block';

                    loggedIn = true;
                })
                .catch((e) => {
                    console.log("error ->" + e)
                    // loginNotificationMessage.textContent = "Please, try again!";
                    notificationMessageRef.current.innerHTML = "Please, try again!";

                    // loginNotificationBlock.style.display = 'block';
                    mainNotificationRef.current.style.display = 'block';
                })
        }
    };

    // function that redirects user, if he is successfully logged in or closes pop up notification
    function pressOkay(event) {
        event.preventDefault();
        // loginNotificationBlock.style.display = 'none';
        mainNotificationRef.current.style.display = 'none';
        if (loggedIn) {
            setTimeout(() => {
                window.location.replace("/main");
            }, 500)
        }
    };

    // function that displays log in log out data depends on token presence
    function displayCorrectWindowData(){
        if( localStorage.getItem('email') === null){
            submitButtonRef.current.innerHTML = "LOG IN";
            pageTitle.current.innerHTML = "Log in"
        } else {
            emailRef.current.style.display = 'none';
            passwordRef.current.style.display = 'none';
            submitButtonRef.current.innerHTML = "LOG OUT";
            pageTitle.current.innerHTML = "Log out"
        }
    }

    return(
        <main className="content content__background" onLoad={displayCorrectWindowData}>
            <div className="container">
                <div className="main__row_for_login_signup">
                    <div className="main__image">
                        <img src={registerImage} alt=""/>
                    </div>
                    <div className="main__form">
                        <h1 ref={pageTitle}></h1>
                        <form action="#" method="post" className="login__form"> {/* onSubmit={sendQuery} */}
                            <input type="text" id="email" name="email" placeholder="email" minLength="5" ref={emailRef} required/>
                            <input type="password" id="password" name="password" placeholder="password" ref={passwordRef}  required/>
                            <button type="submit" className="btn btn__modifier" onClick={sendQuery}> {/*  onSubmit ??? */}
                                <span ref={submitButtonRef}>
                                </span>
                            </button>
                        </form>
                        <div className="main__notification" ref={mainNotificationRef}>
                            <div className="notification__body">
                                <div className="notification__message" ref={notificationMessageRef}>
                                </div>
                                <button type="submit" className="btn__login_ok" onClick={pressOkay}><span>Okay</span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
};

export default Login;

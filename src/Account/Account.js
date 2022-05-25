import './Account.css';
import mainTeam from '../img/main/team.jpg';
import React from "react";

function Account() {

    const URL_USER = 'http://127.0.0.1:5000/api/v15/user/';

    const GET = 'GET';
    const DELETE = 'DELETE';
    const PUT = 'PUT';

    const emailElementRef = React.createRef();
    // const firstnameElementRef = React.createRef();
    // const lastnameElementRef = React.createRef();
    const fullnameElementRef = React.createRef();
    const phoneElementRef = React.createRef();
    const usernameElementRef = React.createRef();
    const editButtonRef = React.createRef();


    // get method to gets user's data
    function getUserData(Url) {
        return new Promise((resolve, reject) => {

            const url = Url + String(localStorage.getItem('email'));

            const xhr = new XMLHttpRequest();

            const tokenFromLocalStorage = localStorage.getItem('token');

            xhr.open(GET, url, true);

            xhr.setRequestHeader('Authorization', 'Bearer ' + tokenFromLocalStorage.trim());

            xhr.onload = () => {
                if (xhr.status >= 400) {
                    reject(xhr.response);
                } else {
                    const responseObject = JSON.parse(xhr.response);
                    resolve({"data": xhr.response});
                }
            }

            xhr.onerror = () => {
                reject(xhr.response);
            }

            xhr.send(null);
        })
    }

    //  function that processes callbacks (resolve, reject) from getUserData
    function getUserDataHandler (event) {
        event.preventDefault();
        getUserData(URL_USER)
            .then((response) => {
                console.log("then ->" + response['data']);
                setUserData(response['data']);
            })
            .catch((e) => console.log("error ->" + e))
    }

    // function that depicts user data
    function setUserData(data){
        data = JSON.parse(data);

        emailElementRef.current.value = data['email'];
        fullnameElementRef.current.value = `${data['firstname']} ${data['lastname']}`;
        phoneElementRef.current.value = data['phone'];
        usernameElementRef.current.value = `${data['username']} [${data['userstatus']}]` ;
    }

    // function that deletes user
    function deleteUser(Url) {
        return new Promise((resolve, reject) => {

            const url = Url + String(localStorage.getItem('email'));

            const xhr = new XMLHttpRequest();

            const tokenFromLocalStorage = localStorage.getItem('token');

            xhr.open(DELETE, url, true);

            xhr.setRequestHeader('Authorization', 'Bearer ' + tokenFromLocalStorage.trim());

            xhr.onload = () => {
                if (xhr.status >= 400) {
                    reject(xhr.response);
                } else {
                    const responseObject = JSON.parse(xhr.response);
                    resolve({"data": xhr.response});
                }
            }

            xhr.onerror = () => {
                reject(xhr.response);
            }

            xhr.send(null);
        })
    }

    // function that processes callbacks (resolve, reject) from deleteUser
    function deleteButtonHandler(event) {
        event.preventDefault();
        deleteUser(URL_USER).then((response) => {
            console.log("then ->" + response['data']);
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            setTimeout(() => {
                window.location.replace("./index.html");
            }, 500)
        })
            .catch((e) => console.log("error ->" + e))
    }

    // PUT method to updates user's data
    function editUser(Url, data){
        return new Promise((resolve, reject) => {

            const url = Url + String(localStorage.getItem('email'));

            const xhr = new XMLHttpRequest();

            const tokenFromLocalStorage = localStorage.getItem('token');

            xhr.open(PUT, url, true);

            xhr.setRequestHeader('Authorization', 'Bearer ' + tokenFromLocalStorage.trim());
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onload = () => {
                if (xhr.status >= 400) {
                    reject(xhr.response);
                } else {
                    const responseObject = JSON.parse(xhr.response);
                    resolve({"data": xhr.response});
                }
            }

            xhr.onerror = () => {
                reject(xhr.response);
            }

            const sendObject = JSON.stringify(data);

            xhr.send(sendObject);
        })
    }


    function editButtonHandler(event){
        event.preventDefault();

        // if (editButtonRef.current.textContent === "Edit Account") {
        if (editButtonRef.current.innerHTML === "Edit Account") {
            console.log("gogo");
            emailElementRef.current.placeholder = 'Enter email';
            fullnameElementRef.current.placeholder = 'Enter fullname';
            phoneElementRef.current.placeholder = 'Enter phone number';
            usernameElementRef.current.placeholder = 'Enter username';

            // placeholders are covered by values
            // clean values
            emailElementRef.current.value = null;
            fullnameElementRef.current.value = null;
            phoneElementRef.current.value = null;
            usernameElementRef.current.value = null;

            emailElementRef.current.removeAttribute('readonly');
            fullnameElementRef.current.removeAttribute('readonly');
            phoneElementRef.current.removeAttribute('readonly');
            usernameElementRef.current.removeAttribute('readonly');
            // editButtonRef.current.textContent = "Submit";
            editButtonRef.current.innerHTML = "Submit";
        }
        else {

            let dataToPut = {};
            let correctInput = true;


            if(fullnameElementRef.current.value.trim().split(" ").length !== 2 && fullnameElementRef.current.value.trim() !== ""){
                fullnameElementRef.current.style.border = "thick solid #ff1717";
                correctInput = false;
            } else {
                fullnameElementRef.current.style.border = "none";
            }
            if (usernameElementRef.current.value.trim().split(" ").length !== 1 && usernameElementRef.current.value.trim().split(" ").length !== 0) {
                usernameElementRef.current.style.border = "thick solid #ff1717";
                correctInput = false;
            }  else {
                usernameElementRef.current.style.border = "none";
            }

            if (correctInput){

                const firstnameValue = fullnameElementRef.current.value.split(" ")[0];
                const lastnameValue = fullnameElementRef.current.value.split(" ")[1];
                const userDataObject = {
                    firstname:firstnameValue,
                    lastname:lastnameValue,
                    username:usernameElementRef.current.value,
                    phone:phoneElementRef.current.value,
                    email:emailElementRef.current.value
                };

                console.log(userDataObject);

                const userKeys = Object.keys(userDataObject);
                console.log(userKeys);
                userKeys.forEach( key => {
                    if (userDataObject[key] !== "" && userDataObject[key] !== undefined && userDataObject[key] !== null ){
                        dataToPut[key] = userDataObject[key];
                    }
                })

                console.log(dataToPut);
                if (Object.keys(dataToPut).length !== 0) {
                    phoneElementRef.current.style.border = "none";
                    emailElementRef.current.style.border = "none";
                    editUser(URL_USER, dataToPut).then(response => {
                        // якщо оновлявся імейл то треба оновити токен
                        if (dataToPut.hasOwnProperty('email')){
                            // log out
                            localStorage.removeItem('token');
                            localStorage.removeItem('email');
                            window.location.replace("./login.html");
                            console.log(" log out please -> " + response);
                        }
                        console.log(" RESPONSE -> " + response);


                    }).catch((e) => {
                        console.log("error ->" + e)
                    });
                } else {
                    console.log("enter anything");
                    fullnameElementRef.current.style.border = "thick solid #ff1717";
                    usernameElementRef.current.style.border = "thick solid #ff1717";
                    phoneElementRef.current.style.border = "thick solid #ff1717";
                    emailElementRef.current.style.border = "thick solid #ff1717";
                }
            }

            setTimeout(() => {
                window.location.reload();
                fullnameElementRef.current.setAttribute('readonly');
                usernameElementRef.current.setAttribute('readonly');
                phoneElementRef.current.setAttribute('readonly');
                emailElementRef.current.setAttribute('readonly');
                editButtonRef.current.textContent = "Edit Account";
            }, 500)


        }
    }

    return (
        <div className="content">
            <div className="container">
                <div className="main">
                    <div className="main__row">
                        <div className="main__side_bar ">
                            <a href="#" className="main__pc_link side_bar_link">

                            </a>
                            <a href="#" className="main__people_link side_bar_link">

                            </a>
                            <a href="#" className="main__cloud_link side_bar_link">

                            </a>
                            <a href="#" className="main__settings_link side_bar_link">

                            </a>
                        </div>
                        <form className="main__body" onLoad={getUserDataHandler}>
                            <div className="main__fullname main_item">
                                <div className="main__subtitle">fullname</div>
                                <input type="text" className="main__title main__title__modificator" placeholder="Enter fullname" ref={fullnameElementRef} readOnly />
                            </div>
                            <div className="main__username main_item">
                                <div className="main__subtitle">username [status]</div>
                                <input type="text" className="main__title main__title__modificator" placeholder="Enter username" ref={usernameElementRef} readOnly/>
                            </div>
                            <div className="phone_and_email">
                                <div className="main__phone main_item">
                                    <input type="text" className="main__title main__title__modificator" placeholder="Enter phone number" ref={phoneElementRef } readOnly/>
                                        <div className="main__subtitle">phone number</div>
                                </div>
                                <div className="main__email main_item">
                                    <div id="email__body">
                                        <div className="email__img">
                                            <img src={mainTeam} alt=""/>
                                        </div>
                                        <div className="email__content">
                                            <input type="text" className="main__title main__title__modificator" placeholder="Enter email" ref={emailElementRef} readOnly/>
                                            <div className="main__subtitle">email</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="main__password main_item">

                                <div className="main__subtitle">password</div>
                                <div id="btn_emulator">reveal<span className="main__title" id="password__hidden">hidden</span></div>
                            </div>
                            <div className="menu2">
                                <div className="container">
                                    <div className="menu2__row">
                                        <a href="#" className="menu2__delete_account_link menu2__link" onClick={deleteButtonHandler}>Delete Account</a>
                                        <button type="submit" href="#"
                                                className="menu2__edit_account_link menu2__link" onClick={editButtonHandler}
                                        ref={editButtonRef}>Edit Account</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Account;

import './Chat.css';
import moment from "moment";
import io from "socket.io-client";
import {useEffect, useState} from "react";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// const socket = io.connect("http://localhost:3001") // connect to backend
const socket = io.connect('http://localhost:3001' , { transports : ['websocket'], secure: true });


function Chat(){

    const [inputValue,setInputValue] = useState("");
    const [messages,setMessages] = useState([]);


    function sendMessage(){
        socket.emit("send_message", {
            message:inputValue,
            userstatus: localStorage.getItem('userStatus')
        })
    }

    // при конекті ми можемо зразу джоїнити адмінів у вільні кімнати з клієнтами
    useEffect(() => {
        socket.on("connect", () => {
            socket.emit("addMeToChatList", {
                email: localStorage.getItem('email'),
                userStatus: localStorage.getItem('userStatus')
            });
        })

        // receive message
        socket.on("receive_message", (data) => {
            setMessages(prev => [...prev, data])
        })

        socket.on("connected", (newUser) => {
            if (localStorage.getItem('userStatus') === 'admin' &&
                newUser.userStatus === 'user') {
                toast(`${newUser.userStatus} ${newUser.email} entered to chat!`, );
            }
            if (localStorage.getItem('email') === newUser.email &&
                localStorage.getItem('userStatus') === 'user'){
                toast(`Please wait for administrator!` );
                console.log(`Please wait for administrator!`);
            }
            if (localStorage.getItem('email') === newUser.email &&
                localStorage.getItem('userStatus') === 'admin'){
                toast('Hi, administrator!');
            }
        })

    },[socket])

    return(
       <>
           <div className={"chat_box"}>
               <div className={"chat_body"}>
                    {
                        messages.map( messageItem =>
                            <div className={"message_item"} key={messageItem.message}>
                                <div className={"username"}>{messageItem.userstatus}</div>
                                {messageItem.message}
                                <span>{moment(messageItem.date).format("h:mm a")}</span>
                            </div>)
                    }
               </div>
               <div className={"chat_footer"}>
                   <input className={"input_field"} value={inputValue} onChange={event => setInputValue(event.target.value)} placeholder={"Write message"}/>
                   <button className={"send_button"} onClick={ () => {
                       if (inputValue !== ''){
                           sendMessage();
                       }
                       setInputValue('');
                   }}>Send</button>
               </div>
           </div>
           <ToastContainer/>
       </>
    )
}

export default Chat
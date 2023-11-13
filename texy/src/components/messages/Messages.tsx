import { useEffect, useState } from "react";
import "../css/Messages.css";

import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const Messages = () => {
    const chats = [
        {
            tag: "incoming",
            msg: "Hello",
            time: "09:00",
        },
        {
            tag: "outgoing",
            msg: "Hello too",
            time: "09:03",
        },
    ];

    const [message, setMessage] = useState("");
    const [receivedMessage, setReceivedMessage] = useState("");

    const check_if_msg_is_incoming_or_outgoing = () => {
        return chats.map((chat, index) => {
            if (chat.tag === "incoming") {
                return (
                    <div key={index} className="msg-box-container incoming-msg">
                        <p>{receivedMessage}</p>
                        <span className="time">09:00</span>
                    </div>
                );
            } else if (chat.tag === "outgoing") {
                return (
                    <div key={index} className="msg-box-container outgoing-msg">
                        <p>Hello too</p>
                        <span className="time">09:00</span>
                    </div>
                );
            }
        });
    };

    const room = "chat";

    const handleSend = () => {
        socket.emit("join_room", room);
        socket.emit("send_message", { message, room });
    };

    useEffect(() => {
        socket.on("received_message", (message) => {
            setReceivedMessage(message.message);
        });
    }, []);

    receivedMessage ? console.log(receivedMessage) : null;

    return (
        <div className="msg-container">
            <div className="msg-box">
                {check_if_msg_is_incoming_or_outgoing()}
                <div className="send-input">
                    <input
                        className="send-in"
                        type="text"
                        placeholder="Enter message"
                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                            setMessage(e.currentTarget.value)
                        }
                    />
                    <button className="send-btn" onClick={handleSend}>
                        <img
                            className="icon"
                            src="src/assets/send-alt.svg"
                            alt="Send icon"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Messages;

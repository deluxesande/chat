import { useEffect, useState } from "react";
import "../css/Messages.css";

import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "../../store/app";
import { API_URL } from "../../App";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

type Chat = {
    sender: string;
    receiver: string;
    message: string;
    _id: string;
};

const Messages = () => {
    const [chats, setChats] = useState<Chat[]>([]);

    const { user } = useSelector((state: RootState) => state.auth);

    const socket = user && io(API_URL);

    const [message, setMessage] = useState("");

    const get_chats = async () => {
        const response = await axios.get(`${API_URL}/chats`, {
            params: { id: user.user._id },
            headers: {
                authorization: `Bearer ${user.accessToken}`,
            },
        });

        // Setting the chats
        if (response.data) {
            setChats(response.data.chats);
        }
    };

    const check_if_msg_is_incoming_or_outgoing = () => {
        return chats.map((chat, index) => {
            if (chat?.sender === user.user._id) {
                return (
                    <div key={index} className="msg-box-container incoming-msg">
                        <p>{chat?.message}</p>
                        <span className="time">09:00</span>
                    </div>
                );
            } else {
                return (
                    <div key={index} className="msg-box-container outgoing-msg">
                        <p>{chat.message}</p>
                        <span className="time">09:00</span>
                    </div>
                );
            }
        });
    };

    const room = user.user._id;

    const handleSend = async () => {
        socket?.emit("join_room", room);
        socket?.emit("send_message", { message, room });

        // const response = await axios.post(
        //     `${API_URL}/chats`,
        //     {
        //         sender: user.user._id,
        //         receiver: "655b0e963a54e01242d9ae64",
        //         message,
        //     },
        //     {
        //         headers: {
        //             authorization: `Bearer ${user.accessToken}`,
        //         },
        //     }
        // );

        const response = await axiosInstance.post("/chats", {
            sender: user.user._id,
            receiver: "655b0e963a54e01242d9ae64",
            message,
        });

        if (response.status === 201) {
            get_chats();
        }

        // Resetting the input box
        const input = document.querySelector(".send-in") as HTMLInputElement;
        input.value = "";
    };

    useEffect(() => {
        get_chats();
    }, []);

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
